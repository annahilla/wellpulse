import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Modal from "../../components/ui/Modal";
import { FormEvent, useEffect, useState } from "react";
import { Habit, Event } from "../../types/types";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createHabit, getHabits } from "../../redux/habitsActions";
import { setError } from "../../redux/authSlice";
import { calculateEndTime } from "../../utils/calculateEndTime";
import useToolbarConfig from "../../hooks/useToolbarConfig";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const CalendarPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<EventInput[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [frequencies, setFrequencies] = useState<string[]>([]);
  const [newHabit, setNewHabit] = useState<Habit>({
    _id: "",
    name: "",
    category: "Sports",
    frequency: "Daily",
    timeOfDay: "10:00",
    duration: 20,
    date: "",
  });

  const { habits, error } = useTypedSelector((state) => state.habits);

  const dispatch = useDispatch<AppDispatch>();

  const toolbarConfig = useToolbarConfig();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    dispatch(getHabits());
  }, [dispatch]);

  const createEvent = (habit: Habit) => {
    const endTime = calculateEndTime(habit.timeOfDay, habit.duration);

    const habitDate = new Date(habit.date);
    if (isNaN(habitDate.getTime())) {
      console.error("Invalid date:", habit.date);
      return;
    }

    const startRecur = new Date(habit.date);
    const endRecur = new Date(habit.date);
    endRecur.setFullYear(endRecur.getFullYear() + 1);

    const dayOfWeek = new Date(habit.date).getDay();

    const newEvent: Event = {
      title: habit.name,
      id: habit._id,
      startTime: habit.timeOfDay,
      endTime: endTime,
      startRecur: startRecur.toISOString(),
      endRecur: endRecur.toISOString(),
      daysOfWeek:
        habit.frequency === "Daily" ? [0, 1, 2, 3, 4, 5, 6] : [dayOfWeek],
    };

    setEvents((prev) => {
      const eventExists = prev.some(
        (event) =>
          event.title === newEvent.title &&
          event.startTime === newEvent.startTime
      );
      if (eventExists) {
        return prev;
      }
      return [...prev, newEvent];
    });
  };

  useEffect(() => {
    if (habits.length > 0) {
      habits.map((habit) => createEvent(habit));
    }
  }, [habits]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/options/categories"
        );
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchFrequencies = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/options/frequencies"
        );
        const data = await response.json();
        if (data.success) {
          setFrequencies(data.frequencies);
        }
      } catch (error) {
        console.error("Error fetching frequencies:", error);
      }
    };

    fetchCategories();
    fetchFrequencies();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewHabit((prevHabit) => ({
      ...prevHabit,
      [name]: value,
    }));
  };

  const createHabitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newHabit.name || newHabit.name.trim() === "") {
      dispatch(setError("Please enter the name of the habit"));
      return;
    }

    if (newHabit.duration <= 0) {
      dispatch(setError("Please enter a valid duration number in minutes"));
      return;
    }

    const currentDate = new Date();
    const habitDate = new Date(newHabit.date);

    if (habitDate < currentDate) {
      dispatch(setError("The start date cannot be before the current date"));
      return;
    }

    try {
      await dispatch(createHabit(newHabit));
      closeModal();
    } catch (err) {
      console.error("Error creating habit: ", err);
    }
  };

  const handleDateClick = () => {
    openModal();
  };

  return (
    <div className="mb-12">
      <div className="my-4 flex items-center justify-center md:justify-end">
        <Button
          handleClick={openModal}
          type="primary"
          size="sm"
          textSize="text-md"
        >
          Add Habit
        </Button>
      </div>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={toolbarConfig}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={events}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
          views={{
            timeGridWeek: {
              dayHeaderFormat: { weekday: "short" },
            },
          }}
        />
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h3 className="text-2xl text-center font-bold mb-4">Add a new habit</h3>
        <form
          onSubmit={createHabitHandler}
          className="flex flex-col gap-5 my-6"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">What habit do you want to incorporate?</label>
            <input
              onChange={handleInputChange}
              className="px-5 py-2 rounded border border-neutral-200 focus:outline-none"
              type="text"
              name="name"
              placeholder="Morning Walk"
              value={newHabit.name}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category">
              What category does this habit belong to?
            </label>
            <select
              onChange={handleInputChange}
              className="px-5 py-2 rounded border border-neutral-200 focus:outline-none"
              name="category"
              value={newHabit.category}
              required
            >
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="frequency">
              How often would you like to do it?
            </label>
            <select
              onChange={handleInputChange}
              className="px-5 py-2 rounded border border-neutral-200 focus:outline-none"
              name="frequency"
              value={newHabit.frequency}
              required
            >
              {frequencies.length > 0 &&
                frequencies.map((frequency) => (
                  <option key={frequency} value={frequency}>
                    {frequency}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="timeOfDay">
              When during the day would you like to do it?
            </label>
            <input
              onChange={handleInputChange}
              className="px-5 py-2 rounded border border-neutral-200 focus:outline-none"
              name="timeOfDay"
              type="time"
              value={newHabit.timeOfDay}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="duration">
              How much time in minutes would you spend on this habit?
            </label>
            <div className="relative flex items-center rounded border border-neutral-200 active:outline-none focus:outline-none">
              <input
                onChange={handleInputChange}
                className="px-5 py-2"
                name="duration"
                type="number"
                placeholder="30"
                value={newHabit.duration}
                required
              />
              <span className="absolute text-sm right-0 px-5 py-2 border-l">
                minutes
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="date">When do you want to start this habit?</label>
            <input
              onChange={handleInputChange}
              className="px-5 py-2 rounded border border-neutral-200 focus:outline-none"
              name="date"
              type="date"
              value={newHabit.date}
              required
            />
          </div>
          <Button type="primary" size="sm" textSize="text-md">
            Add
          </Button>
          {error && <ErrorMessage text={error} />}
        </form>
      </Modal>
    </div>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <p className="px-1">{eventInfo.event.title}</p>
    </>
  );
};

export default CalendarPage;

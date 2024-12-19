import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import Button from "../../components/ui/Button";
import { FormEvent, useEffect, useState } from "react";
import { Habit, Event, Categories } from "../../types/types";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createHabit, getHabits } from "../../redux/habitsActions";
import { setError } from "../../redux/authSlice";
import { calculateEndTime } from "../../utils/calculateEndTime";
import useToolbarConfig from "../../hooks/useToolbarConfig";
import AddHabitForm from "./AddHabitForm";
import HabitDetails from "./HabitDetails";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const categoryColors: { [key: string]: string } = {
  [Categories.Sports]: "bg-blue-300",
  [Categories.Nutrition]: "bg-emerald-300",
  [Categories.MentalHealth]: "bg-purple-300",
  [Categories.Learning]: "bg-yellow-200",
  [Categories.Art]: "bg-amber-400",
};

const CalendarPage = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<Habit>({
    name: "",
    category: Categories.Sports,
    frequency: "Daily",
    timeOfDay: "10:00",
    duration: 20,
    date: "",
    completedDays: []
  });
  const [newHabit, setNewHabit] = useState<Habit>({
    name: "",
    category: Categories.Sports,
    frequency: "Daily",
    timeOfDay: "10:00",
    duration: 20,
    date: "",
    completedDays: []
  });
  const { habits } = useTypedSelector((state) => state.habits);
  const dispatch = useDispatch<AppDispatch>();
  const toolbarConfig = useToolbarConfig();

  const closeFormModal = () => setIsFormModalOpen(false);
  const openFormModal = () => setIsFormModalOpen(true);

  const closeHabitModal = () => setIsHabitModalOpen(false);
  const openHabitModal = () => setIsHabitModalOpen(true);

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
      daysOfWeek: habit.frequency === "Daily" ? [0, 1, 2, 3, 4, 5, 6] : [dayOfWeek],
      extendedProps: {
        category: habit.category,
      },
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
      setEvents([])
      habits.map((habit) => createEvent(habit));
    }
  }, [habits]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setNewHabit((prevHabit) => ({
      ...prevHabit,
      [name]: value,
    }));
  };

  const createHabitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const habitToCreate = {
      ...newHabit,
      completedDays: []
  };

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
      await dispatch(createHabit(habitToCreate));
      closeFormModal();
    } catch (err) {
      console.error("Error creating habit: ", err);
    }
  };

  const handleDateClick = (arg:any) => {
    setNewHabit((prevHabit) => ({
      ...prevHabit,
      date: arg.dateStr, 
    }));
    openFormModal();
  };

  const handleEventClick = (eventInfo: any) => {
    const clickedEvent = eventInfo.event;
    const habitDetails = habits.find(habit => habit._id === clickedEvent.id);
    if (habitDetails) {
      const eventDate = clickedEvent.startStr.split('T')[0];

      const updatedHabit = {
        ...habitDetails,
        date: eventDate, 
    };
      setSelectedHabit((updatedHabit));
      openHabitModal();
    }
  };

  const eventClassNames = (eventInfo: any) => {
    const category = eventInfo.event.extendedProps?.category;
    return categoryColors[category] || "bg-gray-300";
  };

  return (
    <div className="mb-12">
      <div className="my-4 flex items-center justify-center md:justify-end">
        <Button
        isDisabled={false}
          handleClick={openFormModal}
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
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          eventClassNames={eventClassNames}
          eventContent={renderEventContent}
        />
      </div>
      <AddHabitForm 
        isFormModalOpen={isFormModalOpen}
        closeFormModal={closeFormModal}
        createHabitHandler={createHabitHandler}
        handleInputChange={handleInputChange}
        newHabit={newHabit}
      />
      <HabitDetails 
        isHabitModalOpen={isHabitModalOpen}
        habit={selectedHabit}
        closeHabitModal={closeHabitModal}
      />
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
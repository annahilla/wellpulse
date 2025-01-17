import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
  EventMountArg,
} from "@fullcalendar/core/index.js";
import Button from "../../components/ui/Button";
import { FormEvent, useEffect, useState } from "react";
import {
  Habit,
  Event,
  HabitCategories,
  HabitDetailsInterface,
} from "../../types/types";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createHabit, getHabits } from "../../redux/habitsActions";
import { setError } from "../../redux/authSlice";
import { calculateEndTime } from "../../utils/calculateEndTime";
import useToolbarConfig from "../../hooks/useToolbarConfig";
import AddHabitForm from "./AddHabitForm";
import HabitDetails from "./HabitDetails";
import { FaRegCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { categoryColors } from "../../utils/categoryColors";
import { useLocation } from "react-router";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const CalendarPage = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<HabitDetailsInterface>({
    name: "",
    category: HabitCategories.Sports,
    frequency: "Daily",
    timeOfDay: "10:00",
    duration: 20,
    date: "",
    eventDate: "",
    completedDays: [],
  });
  const [newHabit, setNewHabit] = useState<Habit>({
    name: "",
    category: HabitCategories.Sports,
    frequency: "Daily",
    timeOfDay: "10:00",
    duration: 20,
    date: "",
    completedDays: [],
  });
  const { habits } = useTypedSelector((state) => state.habits);
  const dispatch = useDispatch<AppDispatch>();
  const toolbarConfig = useToolbarConfig();

  const closeFormModal = () => setIsFormModalOpen(false);
  const openFormModal = () => setIsFormModalOpen(true);

  const closeHabitModal = () => setIsHabitModalOpen(false);
  const openHabitModal = () => setIsHabitModalOpen(true);

  const location = useLocation();
  const { isFormModalOpen: initialModalState } = location.state || {};

  useEffect(() => {
    if (initialModalState) {
      setIsFormModalOpen(true);
    }
  }, [initialModalState]);

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
      setEvents([]);
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
      completedDays: [],
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
      toast.success("Habit created successfully!");
      closeFormModal();
    } catch (err) {
      console.error("Error creating habit: ", err);
      toast.error("There was an error creating the habit.");
    }
  };

  const handleDateClick = (arg: DateClickArg) => {
    setNewHabit((prevHabit) => ({
      ...prevHabit,
      date: arg.dateStr,
    }));
    openFormModal();
  };

  const handleTimeSlotClick = (arg: DateSelectArg) => {
    const time = arg.start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setNewHabit((prevHabit) => ({
      ...prevHabit,
      timeOfDay: time,
    }));

    openFormModal();
  };

  const handleEventClick = (eventInfo: EventClickArg) => {
    const clickedEvent = eventInfo.event;
    const habitDetails = habits.find((habit) => habit._id === clickedEvent.id);
    if (habitDetails) {
      const eventDate = clickedEvent.startStr.split("T")[0];

      const updatedHabit = {
        ...habitDetails,
        eventDate,
      };
      setSelectedHabit(updatedHabit);
      openHabitModal();
    }
  };

  const handleEventMount = (info: EventMountArg) => {
    const currentDate = new Date();
    const eventDate = new Date(info.event.start!);
    const category = info.event.extendedProps?.category;
    const color = categoryColors[category];

    if (eventDate < currentDate) {
      info.el.classList.add("opacity-50");
    }

    info.el.style.backgroundColor = color;
    const tailwindColorClass = `bg-[${color}]`;
    info.el.classList.add(tailwindColorClass);
    info.el.classList.add("border-0");
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
          timeZone="local"
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          key={toolbarConfig.initialView}
          headerToolbar={toolbarConfig}
          initialView={toolbarConfig.initialView}
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={events}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          select={handleTimeSlotClick}
          eventContent={(eventInfo) => renderEventContent(eventInfo, habits)}
          eventDidMount={handleEventMount}
          views={{
            timeGridDay: {
              slotMinTime: "06:00:00",
              slotMaxTime: "23:00:00",
            },
            timeGridWeek: {
              dayHeaderFormat: { weekday: "short" },
              slotMinTime: "06:00:00",
              slotMaxTime: "23:00:00",
            },
          }}
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

const renderEventContent = (eventInfo: EventContentArg, habits: Habit[]) => {
  const habit = habits.find((habit) => habit._id === eventInfo.event.id);
  const eventDate = eventInfo.event.startStr.split("T")[0];
  const isCompleted = habit?.completedDays.includes(eventDate);

  return (
    <div>
      <b className="px-1">{eventInfo.timeText}</b>
      <div className="flex items-center">
        {isCompleted && (
          <p className="pl-1">
            <FaRegCheckCircle />
          </p>
        )}
        <p className="px-1">{eventInfo.event.title}</p>
      </div>
    </div>
  );
};

export default CalendarPage;

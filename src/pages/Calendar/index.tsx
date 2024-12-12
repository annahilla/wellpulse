import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Modal from "../../components/ui/Modal";
import { FormEvent, useEffect, useState } from "react";
import { Habit } from "../../types/types";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createHabit, getHabits } from "../../redux/habitsActions";
import { setError } from "../../redux/authSlice";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const CalendarPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState<EventInput[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [frequencies, setFrequencies] = useState<string[]>([]);
    const [newHabit, setNewHabit] = useState<Habit>({
        name: '',
        category: 'Sports',
        frequency: 'Daily',
        timeOfDay: '10:00',
        duration: 20,
        date: '',
        event: {
            title: '',
            start: '',
            end: ''
        }
    });

    const { habits, error } = useTypedSelector((state) => state.habits);
    
    const dispatch = useDispatch<AppDispatch>();

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    
    useEffect(() => {
        dispatch(getHabits());
        console.log(habits);
    }, [dispatch]);

    useEffect(() => {
        if (habits.length > 0) {
            setEvents(habits.map(habit => habit.event));
        }
    }, [habits]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/options/categories");
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
                const response = await fetch("http://localhost:5000/api/options/frequencies");
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setNewHabit((prevHabit) => ({
            ...prevHabit,
            [name]: value,
        }));
    };

    const createHabitHandler = async  (event: FormEvent<HTMLFormElement>) => {
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
            const newEvent: EventInput = {
                title: newHabit.name,
                date: newHabit.date,
                start: newHabit.event.start,
                end: newHabit.event.end,
            };
    
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            closeModal();
        } catch(err) {
            console.error("Error creating habit: ", err);
        }
    }
    
    const handleDateClick = (arg: any) => {
        let title = prompt('Please enter a new title for your event');
        let calendarApi = arg.view.calendar;

        calendarApi.unselect();

        if (title) {
            const newEvent: EventInput = {
            id:  crypto.randomUUID(),
            title,
            date: arg.dateStr
        }

        setEvents((prevEvents) => [...prevEvents, newEvent]);

        calendarApi.addEvent(newEvent);
    }}

    return (
        <div className="mb-12">
            <div className="my-4 flex items-center justify-end">
                <Button handleClick={openModal} type="primary" size="sm" textSize="text-md">Add Habit</Button>
            </div>
            <div>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]} 
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                      }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={events}
                    dateClick={handleDateClick} 
                    eventContent={renderEventContent}
                />
            </div>
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
                <h3 className="text-2xl font-bold mb-4">Add a new habit</h3>
                <form onSubmit={createHabitHandler} className="flex flex-col gap-5 my-6" noValidate>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">What habit do you want to incorporate?</label>
                        <input onChange={handleInputChange} className="px-5 py-2 rounded border border-neutral-200 focus:outline-none" type="text" name="name" placeholder="Morning Walk" value={newHabit.name} required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">What category does this habit belong to?</label>
                        <select onChange={handleInputChange} className="px-5 py-2 rounded border border-neutral-200 focus:outline-none" name="category" value={newHabit.category} required>
                            {
                                categories.length > 0 && categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="frequency">How often would you like to do it?</label>
                        <select onChange={handleInputChange} className="px-5 py-2 rounded border border-neutral-200 focus:outline-none" name="frequency" value={newHabit.frequency} required>
                            {
                                frequencies.length > 0 && frequencies.map(frequency => (
                                    <option key={frequency} value={frequency}>{frequency}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="timeOfDay">When during the day would you like to do it?</label>
                        <input onChange={handleInputChange} className="px-5 py-2 rounded border border-neutral-200 focus:outline-none" name="timeOfDay" type="time" value={newHabit.timeOfDay} required/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="duration">How much time in minutes would you spend on this habit?</label>
                        <div className="relative flex items-center rounded border border-neutral-200 active:outline-none focus:outline-none">
                            <input onChange={handleInputChange} className="px-5 py-2" name="duration" type="number" placeholder="30" value={newHabit.duration} required/>
                            <span className="absolute text-sm right-0 px-5 py-2 border-l">minutes</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="date">When do you want to start this habit?</label>
                        <input onChange={handleInputChange} className="px-5 py-2 rounded border border-neutral-200 focus:outline-none" name="date" type="date" value={newHabit.date} required />
                    </div>
                    <Button type="primary" size="sm" textSize="text-md">Add</Button>
                    {
                        error && <ErrorMessage text={error} />
                    }
                </form>
            </Modal>
        </div>
    )
}

const renderEventContent = (eventInfo: EventContentArg) => {
    return (
        <>
          <b>{eventInfo.timeText}</b>
          <p className="px-1">{eventInfo.event.title}</p>
        </>
      )
}

export default CalendarPage;
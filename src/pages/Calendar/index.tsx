import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { FormEvent, useEffect, useState } from "react";
import { Habit } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addHabit } from "../../redux/habitsSlice";
import { getHabits } from "../../redux/habitsActions";

const CalendarPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState<EventInput[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [frequencies, setFrequencies] = useState<string[]>([]);
    const [newHabit, setNewHabit] = useState<Habit>({
        name: '',
        category: 'Sports',
        frequency: 'Daily',
        timeOfDay: '',
        duration: 1,
    });

    const token = useSelector((state: RootState) => state.user.token)
    const habits = useSelector((state: RootState) => state.habits.habits);
    console.log(habits)
    
    const dispatch = useDispatch<AppDispatch>();

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    

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

        if (token) {
            dispatch(getHabits()); 
        }

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

    const createHabit = async  (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(addHabit(newHabit));
            closeModal();
        } catch(err) {
            console.error("User not authenticated. Please log in.");
        }

        console.log('Form data submitted: ', newHabit);
    }
    
    const handleDateClick = (arg: any) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = arg.view.calendar

        calendarApi.unselect()

        if (title) {
            const newEvent: EventInput = {
            id:  crypto.randomUUID(),
            title,
            date: arg.dateStr
        }

        setEvents((prevEvents) => [...prevEvents, newEvent]);

        calendarApi.addEvent(newEvent)
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
                <form onSubmit={createHabit} className="flex flex-col gap-5 my-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">What habit do you want to incorporate?</label>
                        <input onChange={handleInputChange} className="px-5 py-2 rounded border border-neutral-200" type="text" name="name" placeholder="Morning Walk" value={newHabit.name} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">What category does this habit belong to?</label>
                        <select onChange={handleInputChange} className="px-5 py-2 rounded border border-neutral-200" name="category" value={newHabit.category}>
                            {
                                categories.length > 0 && categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="frequency">How often would you like to do it?</label>
                        <select onChange={handleInputChange} className="px-5 py-2 rounded border border-neutral-200" name="frequency" value={newHabit.frequency}>
                            {
                                frequencies.length > 0 && frequencies.map(frequency => (
                                    <option key={frequency} value={frequency}>{frequency}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="timeOfDay">When during the day would you like to do it?</label>
                        <input onChange={handleInputChange} className="px-5 py-2 rounded border border-neutral-200" name="timeOfDay" type="time" value={newHabit.timeOfDay}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="duration">How much time in minutes would you spend on this habit?</label>
                        <div className="relative flex items-center rounded border border-neutral-200">
                            <input onChange={handleInputChange} className="px-5 py-2" name="duration" type="number" placeholder="30" value={newHabit.duration}/>
                            <span className="absolute text-sm right-0 px-5 py-2 border-l">minutes</span>
                        </div>
                    </div>
                    <Button type="primary" size="sm" textSize="text-md">Add</Button>
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
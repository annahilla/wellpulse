import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { useEffect, useState } from "react";

const CalendarPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState<EventInput[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [frequencies, setFrequencies] = useState<string[]>([]);


    const closeModal = () => setIsModalOpen(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

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
                <form className="flex flex-col gap-5 my-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="habit">What habit do you want to incorporate?</label>
                        <input className="px-5 py-2 rounded border border-neutral-200" type="text" name="habit" placeholder="Morning Walk" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">What category does this habit belong to?</label>
                        <select className="px-5 py-2 rounded border border-neutral-200" name="category">
                            {
                                categories.length > 0 && categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">How often would you like to do it?</label>
                        <select className="px-5 py-2 rounded border border-neutral-200" name="frequency">
                        {
                                frequencies.length > 0 && frequencies.map(frequency => (
                                    <option key={frequency} value={frequency}>{frequency}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">When during the day would you like to do it?</label>
                        <input className="px-5 py-2 rounded border border-neutral-200" name="timeOfDay" type="time" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">How much time in minutes would you spend on this habit?</label>
                        <div className="relative flex items-center rounded border border-neutral-200">
                            <input className="px-5 py-2" name="duration" type="number" placeholder="30" />
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
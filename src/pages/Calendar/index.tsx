import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import Button from "../../components/ui/Button";
import { useState } from "react";


const CalendarPage = () => {
    const [events, setEvents] = useState<EventInput[]>([]);
    
    const handleDateClick = (arg: any) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = arg.view.calendar

        calendarApi.unselect()

        if (title) {
            const newEvent: EventInput = {
            id:  Date.now().toString(),
            title,
            start: arg.startStr,
            end: arg.endStr,
            allDay: arg.allDay
        }

        setEvents((prevEvents) => [...prevEvents, newEvent]);

        calendarApi.addEvent(newEvent)
      }}

    return (
        <div className="mb-12">
            <div className="my-4 flex items-center justify-end">
                <Button type="primary" size="sm" textSize="text-md">Add Habit</Button>
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
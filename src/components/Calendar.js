// src/components/Calendar.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import EventForm from './EventForm';
import EventDetail from './EventDetail';
import Modal from './Modal';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  useEffect(() => {
    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsArray = [];
      querySnapshot.forEach((doc) => {
        eventsArray.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsArray);
    });

    return () => unsubscribe();
  }, []);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()));
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null); 
    setShowModal(true);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowModal(true);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const generateCalendar = () => {
    const calendar = [];
    let date = new Date(startDate);
    while (date <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      calendar.push(week);
    }
    return calendar;
  };

  const calendar = generateCalendar();

  const formatMonthYear = (date) => {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const getEventsForDay = (day) => {
    return events.filter(event => event.date === day.toISOString().split('T')[0]);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="calendar-button">Retorno</button>
        <span className="calendar-month-year">{formatMonthYear(currentDate)}</span>
        <button onClick={handleNextMonth} className="calendar-button">Próximo</button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-week day-names">
          {dayNames.map(dayName => (
            <div key={dayName} className="calendar-day-name">
              {dayName}
            </div>
          ))}
        </div>
        {calendar.map((week, index) => (
          <div key={index} className="calendar-week">
            {week.map(day => (
              <div
                key={day.toDateString()}
                className={`calendar-day ${isToday(day) ? 'today' : ''} ${selectedDate && day.toDateString() === selectedDate.toDateString() ? 'selected-day' : ''}`}
                onClick={() => handleDateClick(day)}
              >
                <div>{day.getDate()}</div>
                <div className="calendar-events">
                  {getEventsForDay(day).map(event => (
                    <div key={event.id} className="calendar-event" onClick={(e) => handleEventClick(event, e)}>
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {selectedEvent ? (
            <EventDetail event={selectedEvent} onClose={() => { setShowModal(false); setSelectedEvent(null); }} />
          ) : (
            <EventForm date={selectedDate} onClose={() => setShowModal(false)} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Calendar;

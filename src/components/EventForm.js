// src/components/EventForm.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './EventForm.css';

const EventForm = ({ date, onClose }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'events'), {
        title,
        date: date.toISOString().split('T')[0],
        time,
        description
      });
      setTitle('');
      setTime('');
      setDescription('');
      onClose();
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="event-form-header">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="event-input-title"
        />
        <button type="button" className="event-close-button" onClick={onClose}>✕</button>
      </div>
      <div className="event-form-body">
        <div className="event-form-group">
          <label className="event-label">Data</label>
          <span className="event-date">{date.toDateString()}</span>
        </div>
        <div className="event-form-group">
          <label className="event-label">Hora</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="event-input"
          />
        </div>
        <div className="event-form-group">
          <label className="event-label">Descrição</label>
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="event-textarea"
          />
        </div>
      </div>
      <div className="event-form-footer">
        <button type="button" className="event-button cancel-button" onClick={onClose}>Cancelar</button>
        <button type="submit" className="event-button save-button">Salvar</button>
      </div>
    </form>
  );
};

export default EventForm;

import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './EventDetail.css';

const EventDetail = ({ event, onClose }) => {
  const [title, setTitle] = useState(event.title);
  const [time, setTime] = useState(event.time);
  const [description, setDescription] = useState(event.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    const eventRef = doc(db, 'events', event.id);
    await updateDoc(eventRef, {
      title,
      time,
      description
    });
    setIsEditing(false);
    onClose();
  };

  const handleDelete = async () => {
    const eventRef = doc(db, 'events', event.id);
    await deleteDoc(eventRef);
    window.location.reload(); 
  };

  return (
    <div className="event-detail">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="event-input-title"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="event-input"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="event-textarea"
          />
          <div className="event-detail-footer">
            <button className="event-button cancel-button" onClick={() => setIsEditing(false)}>Cancelar</button>
            <button className="event-button save-button" onClick={handleSave}>Salvar</button>
          </div>
        </>
      ) : (
        <>
          <h2>{title}</h2>
          <p>{time}</p>
          <p>{description}</p>
          <div className="event-detail-footer">
            <button className="event-button edit-button" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="event-button delete-button" onClick={handleDelete}>Excluir</button>
          </div>
        </>
      )}
      <button className="event-close-button" onClick={onClose}>✕</button>
    </div>
  );
};

export default EventDetail;

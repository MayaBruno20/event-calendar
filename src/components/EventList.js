import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const EventList = ({ events }) => {
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'events', id));
    } catch (err) {
      console.error("Error deleting document: ", err);
    }
  };

  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>
          <Link to={`/event/${event.id}`}>{event.title}</Link>
          <button onClick={() => handleDelete(event.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default EventList;

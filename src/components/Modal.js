import React from 'react';
import './Modal.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {React.cloneElement(children, { onClose })}
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, onConfirm, title }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-button confirm">OK</button>
          <button onClick={onClose} className="modal-button cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

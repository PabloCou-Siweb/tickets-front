import React from 'react';
import './TicketResolvedModal.css';

interface TicketResolvedModalProps {
  ticketId: string;
  onClose: () => void;
}

const TicketResolvedModal: React.FC<TicketResolvedModalProps> = ({ ticketId, onClose }) => {
  return (
    <div className="trm-overlay" onClick={onClose}>
      <div className="trm-container" onClick={(e) => e.stopPropagation()}>
        <button className="trm-close-btn" onClick={onClose}>×</button>
        
        {/* Icon */}
        <div className="trm-icon-container">
          <img 
            src="/img/write-image.svg" 
            alt="Ticket Resuelto" 
            className="trm-icon"
          />
        </div>

        {/* Content */}
        <div className="trm-content">
          <h2 className="trm-title">Tu ticket se ha marcado como resuelto</h2>
          <p className="trm-subtitle">
            Ahora puedes revisarlo y puede consultarlo en el <br />
            historial de incidencias
          </p>
        </div>

        {/* Button */}
        <button className="trm-accept-btn" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default TicketResolvedModal;


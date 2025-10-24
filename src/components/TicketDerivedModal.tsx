import React from 'react';
import './TicketDerivedModal.css';

interface TicketDerivedModalProps {
  department: string;
  onClose: () => void;
}

const TicketDerivedModal: React.FC<TicketDerivedModalProps> = ({ department, onClose }) => {
  const getDepartmentName = (dept: string) => {
    switch (dept) {
      case 'programming':
        return 'Programación';
      case 'support':
        return 'Soporte';
      case 'billing':
        return 'Facturación';
      case 'content':
        return 'Contenido';
      default:
        return dept;
    }
  };

  return (
    <div className="tdvm-overlay" onClick={onClose}>
      <div className="tdvm-container" onClick={(e) => e.stopPropagation()}>
        <button className="tdvm-close-btn" onClick={onClose}>×</button>
        
        {/* Icon */}
        <div className="tdvm-icon-container">
          <img 
            src="/img/monitor-image.svg" 
            alt="Ticket Derivado" 
            className="tdvm-icon"
          />
        </div>

        {/* Content */}
        <div className="tdvm-content">
          <h2 className="tdvm-title">
            Tu ticket se ha derivado al departamento de {getDepartmentName(department)}
          </h2>
          <p className="tdvm-subtitle">
            Ahora puedes revisarlo y puede consultarlo en el <br />
            historial de incidencias
          </p>
        </div>

        {/* Button */}
        <button className="tdvm-accept-btn" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default TicketDerivedModal;


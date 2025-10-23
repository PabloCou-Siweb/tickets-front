import React from 'react';
import './HeaderSoporte.css';

interface HeaderSoporteProps {
  currentPage: string;
}

const HeaderSoporte: React.FC<HeaderSoporteProps> = ({ currentPage }) => {
  const getPageIcon = (page: string) => {
    switch (page) {
      case 'Tickets recibidos':
        return '/img/saved-icon.png';
      case 'Tickets enviados':
        return '/img/send-icon.png';
      case 'Historial':
        return '/img/to_do-icon.png';
      case 'Ajustes':
        return '/img/settings-icon.png';
      default:
        return '/img/saved-icon.png';
    }
  };

  return (
    <header className="header-soporte">
      <div className="header-soporte-content">
        <div className="header-soporte-left">
          <img src={getPageIcon(currentPage)} alt={currentPage} className="header-soporte-page-icon" />
          <h1 className="header-soporte-title">{currentPage}</h1>
        </div>
        <div className="header-soporte-center">
          <h2 className="header-soporte-subtitle">Gestión de Incidencias</h2>
        </div>
        <div className="header-soporte-right">
          <button className="header-soporte-notification-button">
            <img 
              src="/img/notification-icon.png" 
              alt="Notificaciones" 
              className="header-soporte-notification-icon"
            />
            <span className="header-soporte-notification-badge">3</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderSoporte;

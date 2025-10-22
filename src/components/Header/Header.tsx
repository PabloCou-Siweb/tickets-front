import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo">
            <span className="logo-icon">🎧</span>
            <span className="logo-text">Siweb Soporte</span>
          </div>
        </div>
        <div className="nav-section">
          <div className="help-text">¿Necesitas ayuda? Estamos aquí para ti</div>
          <div className="current-page">Gestión de Incidencias</div>
        </div>
      </div>
      <div className="header-divider"></div>
    </header>
  );
};

export default Header;

import React from 'react';
import './HeaderUsuario.css';
import logoBlue from '../assets/logo_blue.svg';

interface HeaderUsuarioProps {
  currentPage: string;
}

const HeaderUsuario: React.FC<HeaderUsuarioProps> = ({ currentPage }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <img
            src="/img/headphones-icon.png"
            alt="Headphones"
            className="headphones-icon"
          />
          <img
            src={logoBlue}
            alt="Siweb"
            className="logo"
          />
          <span className="soporte-text">Soporte</span>
        </div>
        <div className="nav-section">
          <div className="help-text">¿Necesitas ayuda? Estamos aquí para ti</div>
        </div>
        <div className="right-section">
          <div className="current-page">{currentPage}</div>
        </div>
      </div>
      <div className="header-divider"></div>
    </header>
  );
};

export default HeaderUsuario;

import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  currentPage: string;
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onLogout, onNavigate }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {/* Logo Section */}
        <div className="sidebar-logo-section">
          <img 
            src="/img/logo_s.svg" 
            alt="Siweb" 
            className="sidebar-logo"
          />
          <div className="sidebar-brand-info">
            <h2 className="sidebar-brand">Siweb</h2>
            <p className="sidebar-user-email">juan.nadie@siweb.es</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-navigation">
          <div className={`sidebar-nav-item ${currentPage === 'Tickets recibidos' ? 'active' : ''}`} onClick={() => onNavigate?.('ticket-received')}>
            <img 
              src="/img/saved-icon.png" 
              alt="Tickets recibidos" 
              className="sidebar-nav-icon"
            />
            <span className="sidebar-nav-text">Tickets recibidos</span>
          </div>

          <div className={`sidebar-nav-item ${currentPage === 'Tickets enviados' ? 'active' : ''}`} onClick={() => onNavigate?.('ticket-sent')}>
            <img 
              src="/img/send-icon.png" 
              alt="Tickets enviados" 
              className="sidebar-nav-icon"
            />
            <span className="sidebar-nav-text">Tickets enviados</span>
          </div>

          <div className={`sidebar-nav-item ${currentPage === 'Historial' ? 'active' : ''}`} onClick={() => onNavigate?.('historial')}>
            <img 
              src="/img/to_do-icon.png" 
              alt="Historial" 
              className="sidebar-nav-icon"
            />
            <span className="sidebar-nav-text">Historial</span>
          </div>

          <div className={`sidebar-nav-item ${currentPage === 'Ajustes' ? 'active' : ''}`} onClick={() => onNavigate?.('ajustes')}>
            <img 
              src="/img/settings-icon.png" 
              alt="Ajustes" 
              className="sidebar-nav-icon"
            />
            <span className="sidebar-nav-text">Ajustes</span>
          </div>
        </nav>

            {/* Logout Section */}
            <div className="sidebar-logout">
              <div className="sidebar-nav-item" onClick={onLogout}>
                <img 
                  src="/img/log_out-icon.png" 
                  alt="Salir" 
                  className="sidebar-nav-icon"
                />
                <span className="sidebar-nav-text">Salir</span>
              </div>
            </div>
      </div>
    </aside>
  );
};

export default Sidebar;

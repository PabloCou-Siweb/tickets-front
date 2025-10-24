import React, { useEffect } from 'react';
import './TicketPostedPage.css';
import backgroundSvg from '../assets/page_background.svg';
import HeaderUsuario from './HeaderUsuario';

interface TicketPostedPageProps {
  onBackToCreate?: () => void;
}

const TicketPostedPage: React.FC<TicketPostedPageProps> = ({ onBackToCreate }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="ticket-posted-page"
      style={{
        backgroundImage: `url(${backgroundSvg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <HeaderUsuario currentPage="Gestión de Incidencias" />

      {/* Main Content */}
      <main className="main-content">
        <div className="main-container">
          {/* Left Panel - Blue Section */}
          <div className="left-panel">
            <div className="image-container">
              <img
                src="/img/support-image2.svg"
                alt="Support Illustration"
                className="support-image"
              />
            </div>

            <div className="info-text">
              <p>
                Tu incidencia ha sido registrada correctamente. Nuestro equipo ya la está revisando y en breve será asignada al departamento correspondiente para darte la mejor solución en el menor tiempo posible.
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="separator"></div>

          {/* Right Panel - Confirmation Section */}
          <div className="right-panel">
            <div className="confirmation-header">
              <div className="airplane-icon">
                <img src="/img/paper_plane-image.svg" alt="Paper Plane" />
              </div>
              <h1>Tu ticket se ha enviado correctamente</h1>
              <p>En breve, uno de nuestros especialistas revisará tu incidencia y se pondrá en contacto contigo para darte seguimiento.</p>
            </div>

            <div className="ticket-id-section">
              <div className="ticket-id-box">
                <span className="ticket-id">ID #2571-D</span>
              </div>
              <div className="ticket-instructions">
                <p className="instruction-bold">Guarda tu número de identificación de incidencia</p>
                <p>Lo necesitarás para hacer seguimiento o para futuras consultas con nuestro equipo.</p>
              </div>
            </div>

            <div className="action-section">
              <button className="btn-exit" onClick={onBackToCreate}>
                Salir
              </button>
            </div>
          </div>
        </div>

        {/* Privacy and Terms Text - Outside the main container */}
        <div className="privacy-terms-text">
          <span>Política de privacidad</span>
          <span>Términos de servicio</span>
        </div>
      </main>

    </div>
  );
};

export default TicketPostedPage;


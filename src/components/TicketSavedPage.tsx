import React, { useEffect } from 'react';
import './TicketSavedPage.css';
import backgroundSvg from '../assets/page_background.svg';
import HeaderUsuario from './HeaderUsuario';

interface TicketSavedPageProps {
  onBackToCreate?: () => void;
}

const TicketSavedPage: React.FC<TicketSavedPageProps> = ({ onBackToCreate }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="ticket-saved-page"
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
                src="/img/support-image3.svg"
                alt="Support Illustration"
                className="support-image"
              />
            </div>

            <div className="info-text">
              <p>
                Has guardado tu incidencia como borrador. Recuerda que aún no ha sido enviada a nuestro equipo de soporte. Cuando la completes, podrás enviarla para que sea atendida.
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="separator"></div>

          {/* Right Panel - Confirmation Section */}
          <div className="right-panel">
            <div className="confirmation-header">
              <div className="write-icon">
                <img src="/img/write-image.svg" alt="Write Icon" />
              </div>
              <h1>Tu ticket se ha guardado como borrador</h1>
              <p>Podrás completarlo y enviarlo más adelante ingresando el número de referencia</p>
            </div>

            <div className="ticket-id-section">
              <div className="ticket-id-box">
                <span className="ticket-id">ID #2571-D</span>
              </div>
              <div className="ticket-instructions">
                <p className="instruction-bold">Guarda tu número de identificación de borrador</p>
                <p>Lo necesitarás para localizar, completar o enviar tu incidencia más adelante.</p>
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

export default TicketSavedPage;

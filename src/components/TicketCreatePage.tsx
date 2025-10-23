import React, { useState } from 'react';
import './TicketCreatePage.css';
import backgroundSvg from '../assets/page_background.svg';
import HeaderUsuario from './HeaderUsuario';
import TicketSentPage from './TicketSentPage';
import TicketSavedPage from './TicketSavedPage';
import SupportLoginPage, { SupportLoginPageProps } from './SupportLoginPage';

interface TicketCreatePageProps {
  onLoginSuccess?: () => void;
}

const TicketCreatePage: React.FC<TicketCreatePageProps> = ({ onLoginSuccess }) => {
  const [showTicketSent, setShowTicketSent] = useState(false);
  const [showTicketSaved, setShowTicketSaved] = useState(false);
  const [showSupportLogin, setShowSupportLogin] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showChannelDropdown, setShowChannelDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    communicationChannel: '',
    ticketTitle: '',
    description: '',
    category: '',
    priority: '',
    product: '',
    privacyAccepted: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
    setShowCategoryDropdown(false);
  };

  const handlePrioritySelect = (priority: string) => {
    setFormData(prev => ({ ...prev, priority }));
    setShowPriorityDropdown(false);
  };

  const handleProductSelect = (product: string) => {
    setFormData(prev => ({ ...prev, product }));
    setShowProductDropdown(false);
  };

  const handleChannelSelect = (channel: string) => {
    setFormData(prev => ({ ...prev, communicationChannel: channel }));
    setShowChannelDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowTicketSent(true);
    // Scroll to top when navigating to TicketSentPage
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Draft saved:', formData);
    setShowTicketSaved(true);
    // Scroll to top when navigating to TicketSavedPage
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

      // Si se ha navegado al login de soporte, mostrar la página de login
      if (showSupportLogin) {
        return <SupportLoginPage 
          onBackToCreate={() => {
            setShowSupportLogin(false);
            // Scroll to top when returning to TicketCreatePage
            setTimeout(() => {
              window.scrollTo(0, 0);
            }, 100);
          }}
          onLoginSuccess={onLoginSuccess}
        />;
      }

  // Si se ha guardado como borrador, mostrar la página de confirmación
  if (showTicketSaved) {
    return <TicketSavedPage onBackToCreate={() => {
      setShowTicketSaved(false);
      // Scroll to top when returning to TicketCreatePage
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }} />;
  }

  // Si se ha enviado el ticket, mostrar la página de confirmación
  if (showTicketSent) {
    return <TicketSentPage onBackToCreate={() => {
      setShowTicketSent(false);
      // Scroll to top when returning to TicketCreatePage
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }} />;
  }

      return (
        <div
          className="ticket-create-page"
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

      {/* Support Link */}
      <div className="support-link">
        <button 
          onClick={() => setShowSupportLogin(true)}
          className="support-link-text"
        >
          ¿Eres soporte?
        </button>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="main-container">
          {/* Left Panel - Blue Section */}
          <div className="left-panel">
            <div className="image-container">
              <img
                src="/img/support-image.svg"
                alt="Support Illustration"
                className="support-image"
              />
            </div>

            <div className="info-text">
              <p>
                Redacta tu incidencia de la forma más detallada posible. Nuestro equipo la revisará y la asignará al departamento correspondiente para darte la mejor solución en el menor tiempo.
              </p>
            </div>

            <div className="draft-section">
              <h3>¿Tienes un número de borrador?</h3>
              <div className="draft-input-container">
                <input
                  type="text"
                  className="draft-input"
                  placeholder="#2571-D"
                />
                <button className="draft-arrow">
                  <img src="/img/arrow-icon.png" alt="Arrow" />
                </button>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="separator"></div>

          {/* Right Panel - Form */}
          <div className="right-panel">
            <div className="form-header">
              <h1>Abrir un ticket</h1>
              <p>Cuéntanos cuál es tu problema para poder ayudarte</p>
            </div>

            <form className="ticket-form" onSubmit={handleSubmit}>
              {/* Datos de contacto */}
              <div className="form-section">
                <div className="section-header">
                  <img src="/img/user-icon.png" alt="User" className="section-icon" />
                  <h3>Datos de contacto</h3>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Laura Gómez Gutierrez"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="laura@empresa.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono (Opcional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+34625898999"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="communicationChannel">Canal de comunicación</label>
                    <div className="custom-dropdown">
                      <button
                        type="button"
                        className="custom-dropdown-button"
                        onClick={() => setShowChannelDropdown(!showChannelDropdown)}
                      >
                        <span className="dropdown-text">
                          {formData.communicationChannel ? 
                            (formData.communicationChannel === 'email' ? 'Email' :
                             formData.communicationChannel === 'phone' ? 'Teléfono' :
                             formData.communicationChannel === 'whatsapp' ? 'WhatsApp' : formData.communicationChannel) 
                            : 'Donde contactamos contigo'
                          }
                        </span>
                        <span className="dropdown-arrow">▼</span>
                      </button>
                      {showChannelDropdown && (
                        <div className="custom-dropdown-menu">
                          <div className="dropdown-option" onClick={() => handleChannelSelect('email')}>
                            Email
                          </div>
                          <div className="dropdown-option" onClick={() => handleChannelSelect('phone')}>
                            Teléfono
                          </div>
                          <div className="dropdown-option" onClick={() => handleChannelSelect('whatsapp')}>
                            WhatsApp
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalles de la incidencia */}
              <div className="form-section">
                <div className="section-header">
                  <img src="/img/saved-icon.png" alt="Document" className="section-icon" />
                  <h3>Detalles de la incidencia</h3>
                </div>

                <div className="form-group">
                  <label htmlFor="ticketTitle">Título del ticket</label>
                  <input
                    type="text"
                    id="ticketTitle"
                    name="ticketTitle"
                    value={formData.ticketTitle}
                    onChange={handleInputChange}
                    placeholder="Indícanos cual es el problema"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Describe tu solicitud</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe el problema y los pasos para reproducirlos"
                    className="form-textarea"
                    rows={4}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Categoría</label>
                    <div className="custom-dropdown">
                      <button
                        type="button"
                        className="custom-dropdown-button"
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      >
                        <span className="dropdown-text">
                          {formData.category ? 
                            (formData.category === 'support' ? 'Soporte' :
                             formData.category === 'billing' ? 'Facturación' :
                             formData.category === 'content' ? 'Contenido' :
                             formData.category === 'programming' ? 'Programación' : formData.category) 
                            : 'Selecciona una categoría'
                          }
                        </span>
                        <span className="dropdown-arrow">▼</span>
                      </button>
                      {showCategoryDropdown && (
                        <div className="custom-dropdown-menu">
                          <div className="dropdown-option" onClick={() => handleCategorySelect('support')}>
                            Soporte
                          </div>
                          <div className="dropdown-option" onClick={() => handleCategorySelect('billing')}>
                            Facturación
                          </div>
                          <div className="dropdown-option" onClick={() => handleCategorySelect('content')}>
                            Contenido
                          </div>
                          <div className="dropdown-option" onClick={() => handleCategorySelect('programming')}>
                            Programación
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="priority">Prioridad</label>
                    <div className="custom-dropdown">
                      <button
                        type="button"
                        className="custom-dropdown-button"
                        onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                      >
                        <span className="dropdown-text">
                          {formData.priority ? 
                            (formData.priority === 'normal' ? 'Normal' :
                             formData.priority === 'high' ? 'Alta' :
                             formData.priority === 'urgent' ? 'Urgente' : formData.priority) 
                            : 'Indica una prioridad'
                          }
                        </span>
                        <span className="dropdown-arrow">▼</span>
                      </button>
                      {showPriorityDropdown && (
                        <div className="custom-dropdown-menu">
                          <div className="dropdown-option" onClick={() => handlePrioritySelect('normal')}>
                            Normal
                          </div>
                          <div className="dropdown-option" onClick={() => handlePrioritySelect('high')}>
                            Alta
                          </div>
                          <div className="dropdown-option" onClick={() => handlePrioritySelect('urgent')}>
                            Urgente
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="product">Elije tu producto</label>
                  <div className="custom-dropdown">
                    <button
                      type="button"
                      className="custom-dropdown-button"
                      onClick={() => setShowProductDropdown(!showProductDropdown)}
                    >
                      <span className="dropdown-text">
                        {formData.product ? 
                          (formData.product === 'sygna' ? 'Sygna by Siweb' :
                           formData.product === 'kit-digital' ? 'Kit Digital - Web' : formData.product) 
                          : 'Sygna by Siweb'
                        }
                      </span>
                      <span className="dropdown-arrow">▼</span>
                    </button>
                    {showProductDropdown && (
                      <div className="custom-dropdown-menu">
                        <div className="dropdown-option" onClick={() => handleProductSelect('sygna')}>
                          Sygna by Siweb
                        </div>
                        <div className="dropdown-option" onClick={() => handleProductSelect('kit-digital')}>
                          Kit Digital - Web
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="file-upload-section">
                <div className="file-upload-area">
                  <img src="/img/upload-icon.png" alt="Upload" className="upload-icon" />
                  <p>Arrastra aquí tus archivos o haz click para seleccionarlos</p>
                  <p className="file-info">JPG, PNG, PDF, ZIP - Máx 10 archivos - 25 MB total</p>
                </div>
              </div>

              {/* Privacy Consent */}
              <div className="privacy-section">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onChange={handleInputChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">
                    Acepto la política de privacidad y el tratamiento de datos para gestionar la solicitud
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Enviar ticket
                </button>
                <button type="button" onClick={handleSaveDraft} className="btn-secondary">
                  Guardar como borrador
                </button>
              </div>
            </form>
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

export default TicketCreatePage;

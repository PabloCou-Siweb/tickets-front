import React, { useState } from 'react';
import './RightPanel.css';

const RightPanel: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'Laura Gómez Gutierrez',
    email: 'laura@empresa.com',
    phone: '+34625898999',
    communicationChannel: '',
    ticketTitle: '',
    description: '',
    category: '',
    priority: '',
    product: 'Sygna by Siweb',
    privacyAccepted: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Draft saved:', formData);
  };

  return (
    <div className="right-panel">
      <div className="form-header">
        <h1>Abrir un ticket</h1>
        <p>Cuéntanos cuál es tu problema para poder ayudarte</p>
      </div>

      <form className="ticket-form" onSubmit={handleSubmit}>
        {/* Datos de contacto */}
        <div className="form-section">
          <div className="section-header">
            <span className="section-icon">👤</span>
            <h3>Datos de contacto</h3>
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
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
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono (Opcional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="communicationChannel">Canal de comunicación</label>
            <select
              id="communicationChannel"
              name="communicationChannel"
              value={formData.communicationChannel}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Donde contactamos contigo</option>
              <option value="email">Email</option>
              <option value="phone">Teléfono</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
        </div>

        {/* Detalles de la incidencia */}
        <div className="form-section">
          <div className="section-header">
            <span className="section-icon">📋</span>
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
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Selecciona una categoría</option>
                <option value="technical">Técnico</option>
                <option value="billing">Facturación</option>
                <option value="general">General</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Prioridad</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Indica una prioridad</option>
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="product">Elije tu producto</label>
            <select
              id="product"
              name="product"
              value={formData.product}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="Sygna by Siweb">Sygna by Siweb</option>
              <option value="Otro producto">Otro producto</option>
            </select>
          </div>
        </div>

        {/* File Upload */}
        <div className="file-upload-section">
          <div className="file-upload-area">
            <div className="upload-icon">↑</div>
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
  );
};

export default RightPanel;

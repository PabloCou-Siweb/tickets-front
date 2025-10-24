import React, { useState } from 'react';
import './TicketDetailsModal.css';
import TicketResolvedModal from './TicketResolvedModal';
import TicketDerivedModal from './TicketDerivedModal';

interface TicketData {
  id: string;
  clientName: string;
  clientCompany: string;
  phone: string;
  creationDate: string;
  product: string;
  department: string;
  status: string;
  description: string;
  comments: Array<{
    author: string;
    role: string;
    date: string;
    text: string;
  }>;
  priority: string;
}

interface TicketDetailsModalProps {
  ticket: TicketData;
  onClose: () => void;
}

const TicketDetailsModal: React.FC<TicketDetailsModalProps> = ({ ticket, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(ticket.priority);
  const [selectedDepartment, setSelectedDepartment] = useState(ticket.department);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showResolvedModal, setShowResolvedModal] = useState(false);
  const [showDerivedModal, setShowDerivedModal] = useState(false);

  const handleSubmit = () => {
    console.log('Guardar cambios:', { selectedPriority, selectedDepartment, newComment });
    setShowDerivedModal(true);
  };

  const handleMarkAsResolved = () => {
    console.log('Marcar como resuelto');
    setShowResolvedModal(true);
  };

  const handleCloseResolvedModal = () => {
    setShowResolvedModal(false);
    onClose();
  };

  const handleCloseDerivedModal = () => {
    setShowDerivedModal(false);
    onClose();
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log('Añadir comentario:', newComment);
      setNewComment('');
    }
  };

  const handlePrioritySelect = (priority: string) => {
    setSelectedPriority(priority);
    setShowPriorityDropdown(false);
  };

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartment(department);
    setShowDepartmentDropdown(false);
  };

  const togglePriorityDropdown = () => {
    setShowPriorityDropdown(!showPriorityDropdown);
    setShowDepartmentDropdown(false);
  };

  const toggleDepartmentDropdown = () => {
    setShowDepartmentDropdown(!showDepartmentDropdown);
    setShowPriorityDropdown(false);
  };

  return (
    <div className="tdm-overlay" onClick={onClose}>
      <div className="tdm-container" onClick={(e) => e.stopPropagation()}>
        <button className="tdm-close-btn" onClick={onClose}>×</button>
        
        {/* Header */}
        <div className="tdm-header">
          <h2 className="tdm-title">Ticket</h2>
          <div className="tdm-id-badge">ID {ticket.id}</div>
        </div>

        {/* Content */}
        <div className="tdm-content">
          
          {/* Información del cliente */}
          <div className="tdm-section">
            <div className="tdm-section-box">
              <div className="tdm-section-header">
                <img 
                  src="/img/user-icon.png" 
                  alt="Usuario" 
                  className="tdm-section-icon"
                />
                <h3 className="tdm-section-title">Información del cliente</h3>
              </div>
              <div className="tdm-info-grid">
                <div className="tdm-info-item">
                  <label className="tdm-info-label">Nombre</label>
                  <p className="tdm-info-value">{ticket.clientName}</p>
                </div>
                <div className="tdm-info-item">
                  <label className="tdm-info-label">Fecha de creación</label>
                  <p className="tdm-info-value">{ticket.creationDate}</p>
                </div>
                <div className="tdm-info-item">
                  <label className="tdm-info-label">Teléfono</label>
                  <p className="tdm-info-value">{ticket.phone}</p>
                </div>
                <div className="tdm-info-item">
                  <label className="tdm-info-label">Producto</label>
                  <p className="tdm-info-value">{ticket.clientCompany}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción de la incidencia */}
          <div className="tdm-section">
            <div className="tdm-section-box">
              <div className="tdm-section-header">
                <img 
                  src="/img/note-icon.png" 
                  alt="Descripción" 
                  className="tdm-section-icon"
                />
                <h3 className="tdm-section-title">Descripción de la incidencia</h3>
              </div>
              <p className="tdm-description-text">{ticket.description}</p>
            </div>
          </div>

          {/* Comentarios */}
          <div className="tdm-section">
            <div className="tdm-section-box">
              <div className="tdm-section-header">
                <img 
                  src="/img/note-icon.png" 
                  alt="Comentarios" 
                  className="tdm-section-icon"
                />
                <h3 className="tdm-section-title">Comentarios</h3>
              </div>
              
              {ticket.comments.length > 0 && (
                <div className="tdm-comments-list">
                  {ticket.comments.map((comment, index) => (
                    <div key={index} className="tdm-comment-item">
                      <div className="tdm-comment-header">
                        <span className="tdm-comment-author">
                          {comment.author} - {comment.role}
                        </span>
                        <span className="tdm-comment-date">{comment.date}</span>
                      </div>
                      <p className="tdm-comment-text">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <textarea
                className="tdm-comment-input"
                placeholder="Añadir comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <button 
                className="tdm-add-comment-btn"
                onClick={handleAddComment}
              >
                Añadir comentario
              </button>
            </div>
          </div>

          {/* Prioridad y Departamento */}
          <div className="tdm-footer-selects">
            <div className="tdm-select-group">
              <label className="tdm-select-label">Prioridad</label>
              <div className="tdm-custom-dropdown">
                <button
                  type="button"
                  className="tdm-dropdown-button"
                  onClick={togglePriorityDropdown}
                >
                  <span className="tdm-dropdown-text">
                    {selectedPriority === 'urgent' ? 'Urgente' :
                     selectedPriority === 'high' ? 'Alta' :
                     selectedPriority === 'normal' ? 'Normal' : selectedPriority}
                  </span>
                      <img src="/img/arrow_down-icon.png" alt="▼" className="tdm-dropdown-arrow" />
                </button>
                {showPriorityDropdown && (
                  <div className="tdm-dropdown-menu">
                    <div className="tdm-dropdown-option" onClick={() => handlePrioritySelect('urgent')}>
                      Urgente
                    </div>
                    <div className="tdm-dropdown-option" onClick={() => handlePrioritySelect('high')}>
                      Alta
                    </div>
                    <div className="tdm-dropdown-option" onClick={() => handlePrioritySelect('normal')}>
                      Normal
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="tdm-select-group">
              <label className="tdm-select-label">Departamento</label>
              <div className="tdm-custom-dropdown">
                <button
                  type="button"
                  className="tdm-dropdown-button"
                  onClick={toggleDepartmentDropdown}
                >
                  <span className="tdm-dropdown-text">
                    {selectedDepartment === 'programming' ? 'Programación' :
                     selectedDepartment === 'support' ? 'Soporte' :
                     selectedDepartment === 'billing' ? 'Facturación' :
                     selectedDepartment === 'content' ? 'Contenido' : selectedDepartment}
                  </span>
                      <img src="/img/arrow_down-icon.png" alt="▼" className="tdm-dropdown-arrow" />
                </button>
                {showDepartmentDropdown && (
                  <div className="tdm-dropdown-menu">
                    <div className="tdm-dropdown-option" onClick={() => handleDepartmentSelect('programming')}>
                      Programación
                    </div>
                    <div className="tdm-dropdown-option" onClick={() => handleDepartmentSelect('support')}>
                      Soporte
                    </div>
                    <div className="tdm-dropdown-option" onClick={() => handleDepartmentSelect('billing')}>
                      Facturación
                    </div>
                    <div className="tdm-dropdown-option" onClick={() => handleDepartmentSelect('content')}>
                      Contenido
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="tdm-footer-buttons">
            <button 
              className="tdm-btn-secondary" 
              onClick={handleMarkAsResolved}
            >
              Marcar como resuelto
            </button>
            <button 
              className="tdm-btn-primary" 
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Ticket Resuelto */}
      {showResolvedModal && (
        <TicketResolvedModal
          ticketId={ticket.id}
          onClose={handleCloseResolvedModal}
        />
      )}

      {/* Modal de Ticket Derivado */}
      {showDerivedModal && (
        <TicketDerivedModal
          department={selectedDepartment}
          onClose={handleCloseDerivedModal}
        />
      )}
    </div>
  );
};

export default TicketDetailsModal;

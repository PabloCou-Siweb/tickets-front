import React, { useEffect, useState } from 'react';
import './ConfigurationPage.css';
import HeaderSoporte from './HeaderSoporte';
import Sidebar from './Sidebar';
import backgroundSvg from '../assets/page_background.svg';

interface ConfigurationPageProps {
  onBackToCreate?: () => void;
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

const ConfigurationPage: React.FC<ConfigurationPageProps> = ({ onBackToCreate, onLogout, onNavigate }) => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    fullName: 'Nombre Apellido',
    email: 'ejemplo@correo.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditPassword = () => {
    setShowPasswordFields(true);
  };

  const handleCancelPassword = () => {
    setShowPasswordFields(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleSubmitPassword = () => {
    // Validar que no estén vacías
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setPasswordError('Por favor, completa todos los campos de contraseña.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden. Por favor, verifica que ambas sean iguales.');
      return;
    }

    // Lógica para actualizar contraseña
    console.log('Actualizando contraseña...');
    setPasswordError('');
    alert('Contraseña actualizada correctamente');
    
    setShowPasswordFields(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  return (
    <div 
      className="cp-page"
      style={{
        backgroundImage: `url(${backgroundSvg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Sidebar currentPage="Ajustes" onLogout={onLogout} onNavigate={onNavigate} />
      
      <main className="cp-main">
        <HeaderSoporte currentPage="Ajustes" />
        
        <div className="cp-content">
          {/* Información Personal */}
          <div className="cp-section">
            <div className="cp-section-header">
              <img src="/img/user-icon.png" alt="User" className="cp-section-icon" />
              <h2 className="cp-section-title">Información personal</h2>
            </div>

            <div className="cp-profile-section">
              <div className="cp-avatar">
                <span className="cp-avatar-text">NA</span>
              </div>
              <div className="cp-avatar-actions">
                <button className="cp-avatar-button">Cambiar foto</button>
                <span className="cp-avatar-info">JPG, PNG máximo 2MB</span>
              </div>
            </div>

            <div className="cp-form-grid">
              <div className="cp-form-group">
                <label className="cp-label">Nombre Completo</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="cp-input"
                />
              </div>

              <div className="cp-form-group">
                <label className="cp-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="cp-input"
                />
              </div>
            </div>
          </div>

          {/* Contraseña */}
          {!showPasswordFields ? (
            <button onClick={handleEditPassword} className="cp-edit-password-button">
              Editar contraseña
            </button>
          ) : (
            <div className="cp-section">
              <div className="cp-section-header">
                <img src="/img/user-icon.png" alt="Password" className="cp-section-icon" />
                <h2 className="cp-section-title">Contraseña</h2>
              </div>

              <>
                <div className="cp-password-grid">
                  <div className="cp-form-group">
                    <label className="cp-label">Contraseña actual</label>
                    <div className="cp-password-wrapper">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="cp-input"
                        placeholder="••••••••••••••••"
                      />
                      <button
                        type="button"
                        className="cp-toggle-password"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        <img
                          src={showCurrentPassword ? "/img/eye_open-icon.png" : "/img/eye_closed-icon.png"}
                          alt="Toggle"
                          className="cp-eye-icon"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="cp-form-group">
                    <label className="cp-label">Nueva contraseña</label>
                    <div className="cp-password-wrapper">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="cp-input"
                        placeholder="••••••••••••••••"
                      />
                      <button
                        type="button"
                        className="cp-toggle-password"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        <img
                          src={showNewPassword ? "/img/eye_open-icon.png" : "/img/eye_closed-icon.png"}
                          alt="Toggle"
                          className="cp-eye-icon"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="cp-form-group">
                    <label className="cp-label">Repite contraseña</label>
                    <div className="cp-password-wrapper">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="cp-input"
                        placeholder="••••••••••••••••"
                      />
                      <button
                        type="button"
                        className="cp-toggle-password"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <img
                          src={showConfirmPassword ? "/img/eye_open-icon.png" : "/img/eye_closed-icon.png"}
                          alt="Toggle"
                          className="cp-eye-icon"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {passwordError && (
                  <div className="cp-error-message">
                    {passwordError}
                  </div>
                )}

                <div className="cp-button-group">
                  <button onClick={handleCancelPassword} className="cp-button-cancel">
                    Cancelar
                  </button>
                  <button onClick={handleSubmitPassword} className="cp-button-submit">
                    Actualizar contraseña
                  </button>
                </div>
              </>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ConfigurationPage;


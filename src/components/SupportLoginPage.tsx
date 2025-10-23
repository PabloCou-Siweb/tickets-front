import React, { useState, useEffect } from 'react';
import './SupportLoginPage.css';

interface SupportLoginPageProps {
  onLoginSuccess?: () => void;
  onBackToCreate?: () => void;
}

const SupportLoginPage: React.FC<SupportLoginPageProps> = ({ onLoginSuccess, onBackToCreate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Scroll to top when component mounts
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support login submitted:', formData);
    // Aquí iría la lógica de autenticación para soporte
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div
      className="support-login-page"
      style={{
        backgroundImage: `url('/img/page_background.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Main Content */}
      <main className="main-content">
        <div className="login-container">
          <div className="login-card">
            {/* Logo Section */}
            <div className="logo-section">
              <img
                src="/img/logo_white.svg"
                alt="Siweb"
                className="logo"
              />
            </div>
            
            {/* Subtitle Section */}
            <div className="subtitle-section">
              <h2 className="subtitle">Gestión de incidencias</h2>
            </div>

            {/* Login Form */}
            <form className="login-form" onSubmit={handleSubmit}>
              <h3 className="form-title">Inicia sesión</h3>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="nombre@email.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Contraseña"
                    className="form-input password-input"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img 
                      src={showPassword ? "/img/eye_open-icon.png" : "/img/eye_closed-icon.png"} 
                      alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      className="password-toggle-icon"
                    />
                  </button>
                </div>
              </div>

              <div className="forgot-password">
                <a href="#forgot" className="forgot-link">¿Olvidaste tu contraseña?</a>
              </div>

              <button type="submit" className="login-button">
                Iniciar sesión
              </button>
              
              {/* Back Link */}
              {onBackToCreate && (
                <div className="back-section">
                  <span onClick={onBackToCreate} className="back-link">
                    Crear ticket
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportLoginPage;
export type { SupportLoginPageProps };
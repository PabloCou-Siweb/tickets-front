import React from 'react';
import './LeftPanel.css';

const LeftPanel: React.FC = () => {
  return (
    <div className="left-panel">
      <div className="illustration-container">
        <div className="illustration">
          <div className="person">
            <div className="headset">🎧</div>
            <div className="person-body">👤</div>
          </div>
          <div className="desk">
            <div className="laptop">💻</div>
            <div className="plant">🪴</div>
          </div>
          <div className="communication-icons">
            <div className="speech-bubble">💬</div>
            <div className="envelope">✉️</div>
            <div className="rating">⭐</div>
          </div>
        </div>
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
            defaultValue="#2571-D"
          />
          <button className="draft-arrow">→</button>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;

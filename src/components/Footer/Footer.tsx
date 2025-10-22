import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#" className="footer-link">Política de privacidad</a>
        <a href="#" className="footer-link">Términos de servicio</a>
      </div>
    </footer>
  );
};

export default Footer;

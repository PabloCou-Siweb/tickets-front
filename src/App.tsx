import React, { useState } from 'react';
import TicketCreatePage from './components/TicketCreatePage';
import TicketReceivedPage from './components/TicketReceivedPage';
import SupportLoginPage from './components/SupportLoginPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('ticket-create');

  const handleLoginSuccess = () => {
    setCurrentPage('ticket-received');
  };

  const handleBackToCreate = () => {
    setCurrentPage('ticket-create');
  };

  const handleLogout = () => {
    setCurrentPage('support-login');
  };

  return (
    <div className="app">
      {currentPage === 'ticket-create' && (
        <TicketCreatePage onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'ticket-received' && (
        <TicketReceivedPage onBackToCreate={handleBackToCreate} onLogout={handleLogout} />
      )}
      {currentPage === 'support-login' && (
        <SupportLoginPage onLoginSuccess={handleLoginSuccess} onBackToCreate={handleBackToCreate} />
      )}
    </div>
  );
}

export default App;

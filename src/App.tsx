import React, { useState } from 'react';
import TicketCreatePage from './components/TicketCreatePage';
import TicketReceivedPage from './components/TicketReceivedPage';
import TicketSentPage from './components/TicketSentPage';
import TicketRecordPage from './components/TicketRecordPage';
import ConfigurationPage from './components/ConfigurationPage';
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

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      {currentPage === 'ticket-create' && (
        <TicketCreatePage onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'ticket-received' && (
        <TicketReceivedPage onBackToCreate={handleBackToCreate} onLogout={handleLogout} onNavigate={handleNavigate} />
      )}
      {currentPage === 'ticket-sent' && (
        <TicketSentPage onBackToCreate={handleBackToCreate} onLogout={handleLogout} onNavigate={handleNavigate} />
      )}
      {currentPage === 'historial' && (
        <TicketRecordPage onBackToCreate={handleBackToCreate} onLogout={handleLogout} onNavigate={handleNavigate} />
      )}
      {currentPage === 'ajustes' && (
        <ConfigurationPage onBackToCreate={handleBackToCreate} onLogout={handleLogout} onNavigate={handleNavigate} />
      )}
      {currentPage === 'support-login' && (
        <SupportLoginPage onLoginSuccess={handleLoginSuccess} onBackToCreate={handleBackToCreate} />
      )}
    </div>
  );
}

export default App;

import React from 'react';
import TicketCreatePage from './components/TicketCreatePage';
import { UserProvider } from './contexts/UserContext';
import { NavigationProvider } from './contexts/NavigationContext';
import './App.css';

function App() {
  return (
    <UserProvider>
      <NavigationProvider>
        <div className="app">
          <TicketCreatePage />
        </div>
      </NavigationProvider>
    </UserProvider>
  );
}

export default App;

import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import CreateTicket from './components/CreateTicket';
import Ticket from './components/Ticket'

import './App.css';

function App() {
  return (
    <div className="App">
      <Login />
      <Register />
      <CreateTicket />
      <Ticket />
    </div>
  );
}

export default App;

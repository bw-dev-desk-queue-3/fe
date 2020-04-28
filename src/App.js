import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from './components/Login';
import Register from './components/Register';
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import CreateTicket from "./components/CreateTicket";
import Nav from './components/Nav';


import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/student" component={Student} />
        <ProtectedRoute exact path="/teacher" component={Teacher} />
        <ProtectedRoute exact path="/create" component={CreateTicket} />
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from './components/Login';
import Register from './components/Register';
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import CreateTicket from "./components/CreateTicket";
import Nav from './components/Nav';


import './App.css';

function App() {
const [ loggedIn, setLoggedIn ] = useState(false);

  return (
    <Router>
      <div className="App">
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Route exact path="/">
          <Login setLoggedIn={setLoggedIn} />
        </Route>
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/student" component={Student} />
        <ProtectedRoute exact path="/teacher" component={Teacher} />
        <ProtectedRoute exact path="/create" component={CreateTicket} />
      </div>
    </Router>
  );
}

export default App;

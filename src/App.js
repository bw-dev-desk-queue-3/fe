import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
    </Router>
  );
}

export default App;

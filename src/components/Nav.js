import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ loggedIn, setLoggedIn }) => {

  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    setLoggedIn(false);
  }

  return (
    <nav>
      <h2>Lambda Dev Desk</h2>
      <Link onClick={logout} to="/">{(loggedIn) ? 'Log Out' : 'Log In'}</Link>
    </nav>
  );
}

export default Nav;
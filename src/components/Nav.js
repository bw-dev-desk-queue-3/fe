import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
  }

  return (
    <nav>
      <Link onClick={logout} to="/">{(JSON.parse(localStorage.getItem('id'))) ? 'Log out' : 'Log In'}</Link>
    </nav>
  );
}

export default Nav;
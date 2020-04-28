import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
  }

  return (
    <nav>
      <Link onClick={logout} to="/">toggleLoggedIn</Link>
    </nav>
  );
}

export default Nav;
import React from 'react';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Nav = ({ loggedIn, setLoggedIn }) => {

  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    setLoggedIn(false);
  }

  const deleteCard = e => {
    e.preventDefault();

    axiosWithAuth().delete(`/api/tickets/22`)
      .then(res => {
        console.log("Delete", res)
      })
      .catch(err => {
        console.log({ err })
      })
  }

  return (
    <nav>
      <h2>Lambda Dev Desk</h2>
      <button onClick={deleteCard} >DELETE</button>
      <Link onClick={logout} to="/">{(loggedIn) ? 'Log Out' : 'Log In'}</Link>
    </nav>
  );
}

export default Nav;
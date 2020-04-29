import React, { useEffect, useState } from 'react';
import { Link }  from 'react-router-dom';
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Nav = ({ loggedIn, setLoggedIn }) => {
  const [ username, setUsername ] = useState(null);

  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('loggedIn');
    setLoggedIn(null);
  }

  // const deleteCard = e => {
  //   e.preventDefault();

  //   axiosWithAuth().delete(`/api/tickets/2`)
  //     .then(res => {
  //       console.log("Delete", res)
  //     })
  //     .catch(err => {
  //       console.log({ err })
  //     })
  // }

  useEffect(() => {
    if(!localStorage.getItem('id')) {
      setUsername(null);
      return;
    }

    axiosWithAuth()
      .get(`https://bw-dev-desk.herokuapp.com/api/users/${localStorage.getItem('id')}`)
      .then(res => {
        setUsername(res.data.first_name);
      })
      .catch(err => {
        console.log(err);
      })
  }, [loggedIn])

  return (
    <nav>
      <h2>Lambda Dev Desk</h2>
      {/* <button onClick={deleteCard} >DELETE</button> */}
      {username && <h2>Welcome, {username}</h2>}
      <Link onClick={logout} to="/">{(loggedIn) ? 'Log Out' : 'Log In'}</Link>
    </nav>
  );
}

export default Nav;
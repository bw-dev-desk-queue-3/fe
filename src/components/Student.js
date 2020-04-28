import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Ticket from './Ticket';
import CreateTicket from './CreateTicket';


const Student = () => {
  const [ tickets, setTickets ] = useState([]);
  const [ userTickets, setUserTickets ] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('https://bw-dev-desk.herokuapp.com/api/tickets')
      .then(res => {
        setTickets(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axiosWithAuth()
      .get(`https://bw-dev-desk.herokuapp.com/api/tickets/student/${JSON.parse(localStorage.getItem('id'))}`)
      .then(res => {
        setUserTickets(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h2>Create a new ticket</h2>
      <CreateTicket tickets={tickets} setTickets={setTickets} userTickets={userTickets} setUserTickets={setUserTickets} />
      <h2>All Tickets</h2>
      <div className="queue">
        {tickets
          .map(ticket => {
            return <Ticket key={ticket.id} data={ticket} />;
          })}
      </div>
      
      <h2>Your Tickets</h2>
      <div className="queue">
        {userTickets
          .map(ticket => {
            return <Ticket key={ticket.id} data={ticket} />;
          })}
      </div>
    </>
  );
}

export default Student;
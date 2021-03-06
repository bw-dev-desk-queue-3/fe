import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//Components
import Ticket from './Ticket'

const Teacher = props => {

    //Get the logged in user's id
    const userId = JSON.parse(localStorage.getItem('id'))

  /************************* STATES *************************/

  //Stores all unassigned tickets available in the queue
  const [ticketQueue, setTicketQueue] = useState(null)

  //Stores all of the logined in users assigned tickets
  const [myTickets, setMyTickets] = useState(null)


  /************************* CALLBACKS *************************/
  
  //Loads in the ticket queue
  useEffect(() => {
    axiosWithAuth().get(`https://bw-dev-desk.herokuapp.com/api/tickets`)
      .then(res => {
        setTicketQueue(res.data)
      })
      .catch(err => {
        console.log('ERROR: ', err)
        setTicketQueue(null)
      })

  }, [])

  //Loads in the assigned tickets for the user
  useEffect(() => {

    axiosWithAuth().get(`https://bw-dev-desk.herokuapp.com/api/tickets/staff/${userId}`)
      .then(res => {
        setMyTickets(res.data)
      })
      .catch(err => {
        console.log('ERROR: ', err)
        setMyTickets(null)
      })

  }, [ticketQueue, userId])


  /**************************** JSX ****************************/
  return (
    <>
      <div className="container">
        <h2>Ticket Queue</h2>
        <div className="queue">
          {
            ticketQueue &&
            ticketQueue
              .filter(ticket => !ticket.is_assigned) //Remove assigned tickets from the data
              .map(ticket => 
                <Ticket 
                  key={ticket.id} 
                  data={ticket} 
                  ticketQueue={ticketQueue}
                  setTicketQueue={setTicketQueue}
                  
                />) //create a ticket in the queue for each unassigned ticket
          }
        </div>
      </div>

      <div className="container">
        <h2>My Tickets</h2>
        <div className="queue">
          {
            myTickets &&
            myTickets
              .map(ticket => 
                <Ticket 
                  key={ticket.id} 
                  data={ticket} 
                  ticketQueue={ticketQueue}
                  setTicketQueue={setTicketQueue}
                  myTickets={myTickets}
                  setMyTickets={setMyTickets}
                  
                />) //creates a ticket in the helpers list
          }
        </div>
      </div>
    </>
  )
}

export default Teacher
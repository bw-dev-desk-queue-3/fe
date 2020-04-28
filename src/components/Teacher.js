import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//Components
import Ticket from './Ticket'

const Teacher = props => {

  /************************* STATES *************************/

  const [ticketQueue, setTicketQueue] = useState(null)

  
  
  /************************* CALLBACKS *************************/
  useEffect(() => {
    axiosWithAuth().get(`https://bw-dev-desk.herokuapp.com/api/tickets`)
      .then(res => {
        console.log({res})
        setTicketQueue(res.data)
      })
      .catch(err => {
        console.log('ERROR: ', err)
      })
  }, [])


  /**************************** JSX ****************************/
  return (
    <div>
      <h2>Ticket Queue</h2>
      <div className="queue">
        {
          ticketQueue && 
          ticketQueue
            .filter(ticket => !ticket.is_assigned) //Remove assigned tickets from the data
            .map(ticket => <Ticket key={ticket.id} data={ticket}/>) //create a ticket in the queue for each unassigned ticket
        }
      </div>
    </div>
  )
}

export default Teacher
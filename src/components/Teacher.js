import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//Components
import Ticket from './Ticket'

const Teacher = props => {

  /************************* STATES *************************/

  const [ticketQueue, setTicketQueue] = useState(null)

  
  
  /************************* CALLBACKS *************************/
  useEffect(() => {
    axiosWithAuth.get(`https://bw-dev-desk.herokuapp.com/api/tickets`)
      .then(res => {
        console,log({res})
      })
      .catch(err => {
        console.log('ERROR: ', err)
      })
  }, [])


  /**************************** JSX ****************************/
  return (
    <div>
      <h2>Ticket Queue</h2>
      <div>
        {
          ticketQueue && ticketQueue.map(ticket => <Ticket data={ticket}/>)
        }
      </div>
    </div>
  )
}

export default Teacher
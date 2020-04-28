import React, { useState } from 'react'

const Ticket = props => {
    const {
        data,
        ticketQueue,
        setTicketQueue
    } = props

    //Checks if user has permission to resolve tickets
    const isAdmin = JSON.parse(localStorage.getItem('is_admin'))

    //Assigns or Returns tickets to the Queue
    const clickHandler = e => {
        
    }

    return (
        <div id={data.id} className="ticket">
            <div className="ticket-heading">
                <div>
                    <h2>{data.title}</h2>
                    <h3>{data.category}</h3>
                </div>

                {
                    isAdmin ?
                        <button
                            value={data.is_assigned}
                            onClick={clickHandler}>
                            {/* Text of Btn wil be either Return or Assign */}
                            {data.is_assigned ? 'Return' : 'Assign'}
                        </button>

                        : null

                        
                }
                {
                    isAdmin && data.is_assigned ?
                        <button>
                            Resolve
                        </button>

                        : null

                        
                }
            </div>

            <div className="ticket-body">
                <p>{data.description}</p>
            </div>

        </div>
    )
}

export default Ticket
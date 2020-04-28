import React from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'


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
        e.preventDefault();
        const id = JSON.parse(localStorage.getItem('id'));

        if(data.is_assigned){
            axiosWithAuth().put(`/api/tickets/${data.id}`, { ...data, is_assigned: !data.is_assigned, assigned_to: 0})
            .then(res => {
                console.log("Update", res )
                setTicketQueue(ticketQueue.map(ticket => {
                    return ticket.id === data.id ? res.data : ticket
                }))

            })
            .catch(err => {
                console.log({ err })
            }) 
        }else{
            axiosWithAuth().put(`/api/tickets/${data.id}`, { ...data, is_assigned: !data.is_assigned, assigned_to: id})
                .then(res => {
                    console.log("Update", res )
                    setTicketQueue(ticketQueue.map(ticket => {
                        return ticket.id === data.id ? res.data : ticket
                    }))
    
                })
                .catch(err => {
                    console.log({ err })
                })
            }

    }

    const handleDelete = e => {
        e.preventDefault();

        axiosWithAuth().delete(`/api/tickets/${data.id}`)
        .then(res => {
            console.log("Delete", res )
            setTicketQueue(ticketQueue.filter(ticket => ticket.key !== data.id))
        })
        .catch(err => {
            console.log({ err })
        })
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
                        <button
                            onClick={handleDelete}
                        >
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
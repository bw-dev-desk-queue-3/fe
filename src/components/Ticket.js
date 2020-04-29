import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'


const Ticket = props => {
    const {
        data,
        ticketQueue,
        setTicketQueue

    } = props

    const [ user, setUser ] = useState(null);

    //Checks if user has permission to resolve tickets
    const isAdmin = JSON.parse(localStorage.getItem('is_admin'))

    useEffect(() => {
        axiosWithAuth().get(`/api/users/${data.user_id}`)
            .then(res => {
                console.log(res);
                setUser(res.data);
            })
            .catch(err => {
                console.log({ err })
            })
    }, [])

    //Assigns or Returns tickets to the Queue
    const clickHandler = e => {
        e.preventDefault();
        const id = JSON.parse(localStorage.getItem('id'));

        axiosWithAuth().put(`/api/tickets/${data.id}`, { ...data, is_assigned: !data.is_assigned, assigned_to: (data.is_assigned) ? 0 : id })
            .then(res => {
                console.log("Update", res)
                setTicketQueue(ticketQueue.map(ticket => {
                    return ticket.id === data.id ? res.data : ticket
                }))

            })
            .catch(err => {
                console.log({ err })
            })
    }

    const handleResolve = e => {
        e.preventDefault();
        const id = JSON.parse(localStorage.getItem('id'));

        axiosWithAuth().put(`/api/tickets/${data.id}`, { ...data, is_resolved: (e.target.name === 'resolve') ? true : false })
            .then(res => {
                console.log("Update", res)
                setTicketQueue(ticketQueue.map(ticket => {
                    return ticket.id === data.id ? res.data : ticket
                }))

            })
            .catch(err => {
                console.log({ err })
            })
    }


    const handleDelete = e => {
        e.preventDefault();

        axiosWithAuth().delete(`/api/tickets/${data.id}`)
            .then(res => {
                console.log("Delete", res)
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
                <div className="ticket-btns">
                    {/* Assign / Return Button */}
                    {
                        isAdmin &&
                            !data.is_resolved ?
                            <button
                                value={data.is_assigned}
                                onClick={clickHandler}>
                                {/* Text of Btn wil be either Return or Assign */}
                                {data.is_assigned ? 'Return' : 'Assign'}
                            </button>

                            : null


                    }
                    {/* Resolve Button */}
                    {
                        isAdmin && !data.is_resolved
                        && data.is_assigned ?
                            <button
                                name="resolve"
                                onClick={handleResolve}
                            >
                                Resolve
                        </button>

                            : null


                    }
                    {/* Ticket Resolved indicator */}
                    {
                        data.is_resolved ? <p className="error">Resolved</p> : null
                    }
                    {/* Delete Ticket Button */}
                    {   
                        isAdmin &&
                        data.is_resolved ?
                            <button
                                onClick={handleDelete}
                            >Delete</button> :

                            null
                    }
                </div>
            </div>

            <div className="ticket-body">
                <p>{data.description}</p>
            </div>

            <p>Posted by: {user && user.first_name}</p>
            <p>Cohort: {user && user.cohort}</p>
        </div>
    )
}

export default Ticket
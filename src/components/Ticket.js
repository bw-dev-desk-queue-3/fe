import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'


const Ticket = props => {
    const {
        data,
        ticketQueue,
        setTicketQueue

    } = props

    const [user, setUser] = useState(null)

    //Ticket created at timestamp for ticket footer 
    const date = new Date(data.created_at).toDateString()
    const time = new Date(data.created_at).toTimeString().slice(0, 5)

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
    }, [data.user_id])

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

    //Converts timestamp time from 24 hr to 12 hr
    const convertTime = time => {
        let hours = parseInt(time.slice(0, 2))
        const min = time.slice(3, 5)

        //if hours is < 13 then we don't need to change unless its 00:XX
        if (hours < 12) {
            //Checking to see if its 00:XX
            if (hours < 1) {
                hours = 12
                return `${hours}:${min} AM`
            }
            //Adds AM to time and return
            else return `${hours}:${min} AM`
        }
        //12 noon needs to have AM changed to PM
        else if(hours === 12) {
            return `${hours}:${min} PM`
        }
        //If hours is > 12 we need to convert to 12 hr format and add PM
        else {
            hours -= 12
            return `${hours}:${min} PM`
        }
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
                                className={data.is_assigned ? 'return-btn' : 'assign-btn'}
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
                                className="resolve-btn"
                                name="resolve"
                                onClick={handleResolve}
                            >
                                Resolve
                        </button>

                            : null


                    }
                    {/* Ticket Resolved indicator */}
                    {
                        data.is_resolved ? <p>Resolved</p> : null
                    }
                    {/* Delete Ticket Button */}
                    {
                        isAdmin &&
                            data.is_resolved ?
                            <button
                                className="delete-btn"
                                onClick={handleDelete}
                            >Delete</button>

                            : null
                    }
                </div>
            </div>

            <div className="ticket-body">
                <p>{data.description}</p>
            </div>

            {/* Ticket Footer displays who created the ticket and the date */}
            <div className="ticket-footer">
                <p>{`Posted by: ${user && user.first_name} ${user && user.cohort} on ${date} at ${convertTime(time)}`}</p>
            </div>
        </div>
    )
}

export default Ticket
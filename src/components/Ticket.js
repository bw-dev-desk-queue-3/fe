import React from 'react'

const Ticket = props => {
    const {
        title,
        category,
        description,
        is_assigned 
    } = props

    return(
        <div className="container">
            <div className="ticket-heading">
                <div>
                    <h2>{title}</h2>
                    <h3>{category}</h3>
                </div>

                <button>{is_assigned ? 'Return' : 'Assign'}</button>
            </div>

            <div className="ticket-body">
                <p>{description}</p>
            </div>

        </div>
    )
}

export default Ticket
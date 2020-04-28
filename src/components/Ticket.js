import React from 'react'

const Ticket = props => {

    return(
        <div className="container">
            <div className="ticket-heading">
                <div>
                    <h2>Title</h2>
                    <h3>Category</h3>
                </div>

                <button>Assign/Return</button>
            </div>

            <div className="ticket-body">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non et harum praesentium, sint nihil tempora quis minus voluptatem? Recusandae ex dolorum aliquid neque dignissimos et facilis voluptatibus nesciunt accusamus excepturi?</p>
            </div>

        </div>
    )
}

export default Ticket
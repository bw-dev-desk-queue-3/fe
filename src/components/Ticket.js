import React from 'react'

const Ticket = props => {
    const {
        id,
        title,
        category,
        description,
        is_assigned 
    } = props.data

    const clickHandler = props.onClick

    //Checks if user has permission to resolve tickets
    const isAdmin = JSON.parse(localStorage.getItem('is_admin'))

    return(
        <div id={id} className="ticket">
            <div className="ticket-heading">
                <div>
                    <h2>{title}</h2>
                    <h3>{category}</h3>
                </div>

                {
                    isAdmin ? 
                    <button 
                        value={is_assigned}
                        onClick={clickHandler}>
                            {/* Text of Btn wil be either Return or Assign */}
                            {is_assigned ? 'Return' : 'Assign'}
                    </button> 
                    
                    : null
                }
            </div>

            <div className="ticket-body">
                <p>{description}</p>
            </div>

        </div>
    )
}

export default Ticket
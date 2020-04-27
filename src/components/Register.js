import React from 'react'

const Register = props =>{
    const {
        values,
        disabled,
        onInputChange,
        onSubmit
    } = props

    return(
        <form onSubmit={onSubmit}>

            {/* Text input for First Name */}
            <label htmlFor="fname">
                <input
                    id="fname"
                    name="fname"
                    type="text"
                    value={values.fname}
                />
            </label>

            {/* Text input for Last Name */}
            <label htmlFor="lname">
                <input
                    id="lname"
                    name="lname"
                    type="text"
                    value={values.lname}
                />
            </label>

            {/* Text input for Username */}
            <label htmlFor="username">
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={values.username}
                />
            </label>

            {/* Text input for Password */}
            <label htmlFor="password">
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                />
            </label>

            {/* Text input for Email */}
            <label htmlFor="email">
                <input
                    id="email"
                    name="email"
                    type="text"
                    value={values.email}
                />
            </label>

            {/*  */}
            <label htmlFor="admin">
                <input
                    id="admin"
                    name="admin"
                    type="checkbox"
                />
            </label>

            {/* Text input for Cohort */}
            <label htmlFor="cohort">
                <input
                    id="cohort"
                    name="cohort"
                    type="text"
                    value={values.cohort}
                />
            </label>

            {/* Submit Button */}
            <button 
                type="submit"
                disabled={disabled}
            >
                Submit
            </button>
        </form>
    )
}

export default Register
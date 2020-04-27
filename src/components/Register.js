import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from "axios"

/************************ Validation Format ************************/
const formSchema = yup.object().shape({
    first_name:
        yup
            .string()
            .min(3, 'Your name must contain at least 3 letters')
            .required('You must enter your first name'),
    last_name:
        yup
            .string()
            .min(3, 'Your name must contain at least 3 letters')
            .required('You must enter your last name'),
    username:
        yup
            .string()
            .required('You must enter a username'),
    password:
        yup
            .string()
            .min(8, 'Your password must be at least 8 characters long')
            .required('You must enter a password'),
    email:
        yup
            .string()
            .email('Enter a valid email')
            .required('You must enter a valid email'),
    is_admin:
        yup
            .string()
            .matches(/false|true/, 'Select a valid role')
            .required('You must select a role'),
    cohort:
        yup
            .string()
            .required('You must enter your Cohort')
})

const Register = props => {

    //Initial formValues
    const initFormValues = {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        is_admin: '',
        cohort: ''
    }

    //Initial formErrors
    const initFormErrors = {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        is_admin: '',
        cohort: ''
    }

    /******************************* STATES *******************************/

    //Input form field values
    const [formValues, setFormValues] = useState(initFormValues)

    //Holds the error messages for Form validation
    const [formErrors, setFormErrors] = useState(initFormErrors)

    //Submit Button Disabled yes/no?
    const [submitDisabled, setSubmitDisabled] = useState(true)

    /***************************** CALLBACKS *****************************/

    //Update formValues when the input values change
    const onInputChange = e => {
        const name = e.target.name
        const value = e.target.value

        //Compare input to validation
        yup
            .reach(formSchema, name)
            .validate(value)
            .then(valid => {
                //Clear the errors if the value is passes the test
                setFormErrors({
                    ...formErrors, [name]: '',
                })
            })
            .catch(err => {
                //Set our error message into the formErrors if it doesn't pass the test
                setFormErrors({
                    ...formErrors, [name]: err.errors[0],
                })
            })

        //Set form values into state
        setFormValues({
            ...formValues, [name]: value
        })
    }

    //Enable the Submit button if the Form is filled in correctly
    useEffect(() => {
        formSchema
            .isValid(formValues)
            .then(valid => {
                setSubmitDisabled(!valid)
            })

    }, [formValues])

    //Submits the Registration Form data to the server
    const onSubmit = e => {
        e.preventDefault()

        axios.post(`https://bw-dev-desk.herokuapp.com/api/register`, formValues)
            .then(res => {
                console.log({ res })
            })
            .catch(err => {
                console.log({ err })
                console.log({ formValues })
            })

        //Reset the form
        setFormValues(initFormValues)
    }

    /***************************** JSX *****************************/
    return (
        <form className="register" onSubmit={onSubmit}>

            <h2>User Registration</h2>

            {/* Text input for First Name */}
            <label>First Name
                <input
                    name="first_name"
                    type="text"
                    value={formValues.fname}
                    onChange={onInputChange}
                />
                {formErrors.first_name.length > 3 ? (<p className="error">{formErrors.first_name}</p>) : null}
            </label>

            {/* Text input for Last Name */}
            <label>Last Name
                <input
                    name="last_name"
                    type="text"
                    value={formValues.lname}
                    onChange={onInputChange}
                />
                {formErrors.last_name.length > 3 ? (<p className="error">{formErrors.last_name}</p>) : null}
            </label>

            {/* Text input for Username */}
            <label>Username
                <input
                    name="username"
                    type="text"
                    value={formValues.username}
                    onChange={onInputChange}
                />
                {formErrors.username.length > 0 ? (<p className="error">{formErrors.username}</p>) : null}
            </label>

            {/* Text input for Password */}
            <label>Password
                <input
                    name="password"
                    type="password"
                    value={formValues.password}
                    onChange={onInputChange}
                />
                {formErrors.password.length > 8 ? (<p className="error">{formErrors.password}</p>) : null}
            </label>

            {/* Text input for Email */}
            <label>Email
                <input
                    name="email"
                    type="text"
                    value={formValues.email}
                    onChange={onInputChange}
                />
                {formErrors.email.length > 0 ? (<p className="error">{formErrors.email}</p>) : null}
            </label>

            {/* Student/Teacher Dropdown */}
            <label>Role<br></br>
                <select
                    name="is_admin"
                    value={formValues.role}
                    onChange={onInputChange}
                >
                    <option value="">-- Select --</option>
                    <option value="false">Student</option>
                    <option value="true">Teacher</option>
                </select>
                {formErrors.is_admin.length > 0 ? (<p className="error">{formErrors.is_admin}</p>) : null}
            </label>

            {/* Text input for Cohort */}
            <label>Cohort
                <input
                    name="cohort"
                    type="text"
                    value={formValues.cohort}
                    onChange={onInputChange}
                />
                {formErrors.cohort.length > 0 ? (<p className="error">{formErrors.cohort}</p>) : null}
            </label>

            {/* Submit Button */}
            <button type="submit" disabled={submitDisabled}>Submit</button>
        </form>
    )
}

export default Register
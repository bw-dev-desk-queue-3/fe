import React, { useState, useEffect } from 'react'
import * as yup from 'yup'

const Register = props => {

    //Initial formValues
    const initFormValues = {
        fname: '',
        lname: '',
        username: '',
        password: '',
        email: '',
        role: '',
        cohort: ''
    }

    //Initial formErrors
    const initFormErrors = {
        fname: '',
        lname: '',
        username: '',
        password: '',
        email: '',
        role: '',
        cohort: ''
    }

    /************************ Validation Format ************************/
    const formSchema = yup.object().shape({
        fname:
            yup
                .string()
                .min(3, 'Your name must contain at least 3 letters')
                .required('You must enter your first name'),
        lname:
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
        role:
            yup
                .string()
                .matches(/student|teacher/, 'Select a valid role')
                .required('You must select a role'),
        cohort:
            yup
                .string()
                .required('You must enter your Cohort')
    })

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

        //Reset the form
        setFormValues(initFormValues)
    }

    /***************************** JSX *****************************/
    return (
        <form onSubmit={onSubmit}>

            {/* Text input for First Name */}
            <label htmlFor="fname">First Name
                <input
                    id="fname"
                    name="fname"
                    type="text"
                    value={formValues.fname}
                    onChange={onInputChange}
                />
                {formErrors.fname.length > 3 ? (<p className="error">{formErrors.fname}</p>) : null}
            </label>

            {/* Text input for Last Name */}
            <label htmlFor="lname">Last Name
                <input
                    id="lname"
                    name="lname"
                    type="text"
                    value={formValues.lname}
                    onChange={onInputChange}
                />
                {formErrors.lname.length > 3 ? (<p className="error">{formErrors.lname}</p>) : null}
            </label>

            {/* Text input for Username */}
            <label htmlFor="username">Username
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formValues.username}
                    onChange={onInputChange}
                />
                {formErrors.username.length > 0 ? (<p className="error">{formErrors.username}</p>) : null}
            </label>

            {/* Text input for Password */}
            <label htmlFor="password">Password
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formValues.password}
                    onChange={onInputChange}
                />
                {formErrors.password.length > 8 ? (<p className="error">{formErrors.password}</p>) : null}
            </label>

            {/* Text input for Email */}
            <label htmlFor="email">Email
                <input
                    id="email"
                    name="email"
                    type="text"
                    value={formValues.email}
                    onChange={onInputChange}
                />
                {formErrors.email.length > 0 ? (<p className="error">{formErrors.email}</p>) : null}
            </label>

            {/* Student/Teacher Dropdown */}
            <label htmlFor="role">Role
                <select
                    id="role"
                    name="role"
                    value={formValues.role}
                    onChange={onInputChange}
                >
                    <option value="">-- Select --</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                {formErrors.role.length > 0 ? (<p className="error">{formErrors.role}</p>) : null}
            </label>

            {/* Text input for Cohort */}
            <label htmlFor="cohort">Cohort
                <input
                    id="cohort"
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
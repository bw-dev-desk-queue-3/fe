import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Field is required'),
  description: yup.string().required('Field is required'),
  category: yup.string().required('Field is required')
});



const CreateTicket = ({ tickets, setTickets, userTickets, setUserTickets }) => {
  const id = JSON.parse(localStorage.getItem('id'));

  const [ newTicket, setNewTicket ] = useState({
    title: '',
    description: '',
    category: '',
    user_id: id
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: ''
  })

  const [buttonOff, setButtonOff] = useState(true);

  const handleChange = (e) => {
    e.persist();
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
    validate(e);
  }

  const submitTicket = (e) => {
    e.preventDefault();
    axiosWithAuth().post(`/api/tickets/`, newTicket)
      .then(res => {
        console.log({ res })
        setTickets([
          ...tickets,
          res.data
        ])
        setUserTickets([
          ...userTickets,
          res.data
        ])
      })
      .catch(err => {
        console.log({ err })
        console.log({newTicket})
      })
    setNewTicket({
      title: '',
      description: '',
      category: ''
    });
  }

  const validate = (e) => {
    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ''
        })
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors
        })
      })
  }


  useEffect(() => {
    schema
      .isValid(newTicket)
      .then((valid) => {
        setButtonOff(!valid);
      });
  }, [newTicket])

  return (
    <form onSubmit={submitTicket} className="create-ticket">
      <label>
        Title:
        <input
          name="title"
          value={newTicket.title}
          onChange={handleChange}
         />
      </label>
      {errors.title && <p className="error">{errors.title}</p>}
      <label>
        Description:
        <textarea
          className="textarea"
          name="description"
          value={newTicket.description}
          onChange={handleChange}
         />
      </label>
      {errors.description && <p className="error">{errors.description}</p>}
      <label>
        Category:
        <textarea
          className="textarea"
          name="category"
          value={newTicket.category}
          onChange={handleChange}
         />
      </label>
      {errors.category && <p className="error">{errors.category}</p>}
      <button disabled={buttonOff}>Submit</button>
    </form>
  );
} 

export default CreateTicket;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Feild is required'),
  description: yup.string().required('Feild is required'),
  category: yup.string().required('Feild is required')
});

const CreateTicket = () => {
  const [ newTicket, setNewTicket ] = useState({
    title: '',
    description: '',
    category: ''
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
        What I have tried:
        <textarea
          className="textarea"
          name="category"
          value={newTicket.tried}
          onChange={handleChange}
         />
      </label>
      {errors.category && <p className="error">{errors.category}</p>}
      <button disabled={buttonOff}>Submit</button>
    </form>
  );
} 

export default CreateTicket;
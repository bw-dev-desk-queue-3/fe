import React, { useState } from 'react';
import * as yup from 'yup';

const CreateTicket = () => {
  const [ newTicket, setNewTicket ] = useState({
    title: '',
    description: '',
    tried: ''
  });

  const handleChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value })
  }

  const submitTicket = (e) => {
    e.preventDefault();
    setNewTicket({
      title: '',
      description: '',
      tried: ''
    });
  }

  return (
    <form onSubmit={submitTicket} className="login">
      <label htmlFor="title">
        Title:
        <input
          id="title"
          name="title"
          value={newTicket.title}
          onChange={handleChange}
         />
      </label>
      <label htmlFor="description">
        Description:
        <textarea
          className="textarea"
          id="description"
          name="description"
          value={newTicket.description}
          onChange={handleChange}
         />
      </label>
      <label htmlFor="tried">
        What I have tried:
        <textarea
          className="textarea"
          id="tried"
          name="tried"
          value={newTicket.tried}
          onChange={handleChange}
         />
      </label>
      <button>Submit</button>
    </form>
  );
} 

export default CreateTicket;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});


const Login = () => {
  const [ user, setUser ] = useState({ username: '', password: '' });
  const [buttonOff, setButtonOff] = useState(true);


  const [errors, setErrors] = useState({
    username: '',
    password: ''
  })

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
      .isValid(user)
      .then((valid) => {
        setButtonOff(!valid);
      });
  }, [user])


  const onSubmit = e => {
    e.preventDefault();

    axios
      .post('https://bw-dev-desk.herokuapp.com/api/login', user)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", JSON.stringify(res.data.token))
      })
      .catch(err => console.log(err))
      
    setUser({ username: '', password: '' });
  };

  const handleChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
    validate(e);
  }


  return (
    <form className="login" onSubmit={onSubmit}>
      <label htmlFor='username'>
        Username
        <input
          id="username"
          name="username"
          type="text"
          value={user.username}
          onChange={handleChange}
        />
      </label>
      {errors.username && <p className="error">{errors.username}</p>}
      <label htmlFor='password'>
        Password
        <input
          id="password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
      </label>
      {errors.password && <p className="error">{errors.password}</p>}
      <button disabled={buttonOff}>Login</button>
      <button>Sign Up!</button>
    </form>
  );
}

export default Login;
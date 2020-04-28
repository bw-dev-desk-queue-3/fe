import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});


const Login = () => {
  const [ user, setUser ] = useState({ username: '', password: '' });
  const [buttonOff, setButtonOff] = useState(true);
  const { push } = useHistory();
  const [ userName, setUserName ] = useState();


  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

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
        setUserName(user.username);
      })
      .catch(err => console.log(err));

    setUser({ username: '', password: '' });
  };

  useEffect(() => {
    if(!userName) return;
    axiosWithAuth()
      .get('https://bw-dev-desk.herokuapp.com/api/users')
      .then(res => {
        console.log({res});
        const user = res.data.filter(user => user.username === userName);
        console.log(user);
        const is_admin = user[0].is_admin;
        console.log({is_admin})
        const id = user[0].id;
        localStorage.setItem("is_admin", JSON.stringify(is_admin));
        localStorage.setItem("id", JSON.stringify(id));
        setUserName();
        if(is_admin){
          push("/teacher")
        }else{
          push("/student")
        }
      })
      .catch(err => console.log(err))
  }, [userName])

  const handleChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
    validate(e);
  }


  return (
    <form className="login" onSubmit={onSubmit}>
      <label>
        Username
        <input
          name="username"
          type="text"
          value={user.username}
          onChange={handleChange}
        />
      </label>
      {errors.username && <p className="error">{errors.username}</p>}
      <label>
        Password
        <input
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
      </label>
      {errors.password && <p className="error">{errors.password}</p>}
      <button disabled={buttonOff}>Login</button>
      <button onClick={() => {push("/register")}}>Sign Up!</button>
    </form>
  );
}

export default Login;
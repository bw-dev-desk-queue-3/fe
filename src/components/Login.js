import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const Login = () => {
  const [ user, setUser ] = useState({ username: '', password: '' });
  const { username, password } = user;

  const onSubmit = values => {
    console.log(values);
    
  };

  const { handleSubmit, register, errors } = useForm();

  return (
    <form className="login" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='username'>
        Username
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          ref={register({
            required: 'Username is required'
          })}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </label>
      {errors.username && errors.username.message}
      <label htmlFor='password'>
        Password
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          ref={register({
            required: 'Password is required'
          })}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </label>
      {errors.password && errors.password.message}
      <button>Login</button>
      <button>Sign Up!</button>
    </form>
  );
}

export default Login;
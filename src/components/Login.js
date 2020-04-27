import React from 'react';

const Login = (props) => {
  const { username, password } = props;

  return (
    <form className="login" onSubmit={null}>
      <label htmlFor='username'>
        Username
        <input
          id="username"
          name="username"
          value={username}
          onChange={null}
        />
      </label>
      <label htmlFor='password'>
        Password
        <input
          id="password"
          name="password"
          value={password}
          onChange={null}
        />
      </label>
      <button>Login</button>
      <button>Sign Up!</button>
    </form>
  );
}

export default Login;
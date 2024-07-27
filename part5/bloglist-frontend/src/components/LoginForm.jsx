import React, { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginLocal = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(username, password);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleLoginLocal}>
        <div>
          <label>
            Username:
            <input
              type="text"
              name="Username"
              data-testid="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="Password"
              data-testid="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

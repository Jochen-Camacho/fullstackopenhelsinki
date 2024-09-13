import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

      <Form onSubmit={handleLoginLocal}>
        <Form.Group>
          <Form.Label>
            Username:
            <Form.Control
              type="text"
              name="Username"
              data-testid="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Password:
            <Form.Control
              type="password"
              name="Password"
              data-testid="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Label>
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginForm;

import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const token = await login(loginData);
      if (!token) {
        throw new Error('Invalid username or password');
      }
      Auth.login(token);
      window.location.href = '/kanban-board';
    } catch (err) {
      console.error('Failed to login', err);
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={loginData.username || ''}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password || ''}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Submit Form</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
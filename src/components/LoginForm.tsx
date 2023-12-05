import React, { useState } from 'react';
import axios from 'axiosConfig';

const LoginForm: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // TODO: Send login request to the server and handle the response
    try {
      const response = await axios.post('/auth/login', { phone, password });
      // Handle response here
      console.log(response.data);
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };

  const handleRegisterFormOpen = () => {
    // TODO: Handle opening the register form
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Phone:
        <input type="text" value={phone} onChange={handlePhoneChange} />
      </label>
      <br />
      <label>
        Password:
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <br />
      <label>
        Show Password:
        <input type="checkbox" checked={showPassword} onChange={handleShowPasswordToggle} />
      </label>
      <br />
      <button type="submit">Login</button>
      <button type="button" onClick={handleRegisterFormOpen}>
        Register
      </button>
    </form>
  );
};

export default LoginForm;

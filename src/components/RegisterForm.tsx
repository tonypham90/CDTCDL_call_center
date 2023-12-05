'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axiosConfig';

type User = {
  phone: string;
  avatar: string;
  fullName: string;
  isDriver: boolean;
  isActive: boolean;
  isAdmin: boolean;
  isVip: boolean;
  coordinate: { latitude: number; longitude: number };
  authentication: { password: string };
  deviceToken: string;
};

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    try {
      // Call the API to process the data
      await axios.post('/auth/register', data);
      // Handle success
      console.log('Registration successful');
    } catch (error) {
      // Handle error
      setLoading(false);
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>}
      <label htmlFor="phone">
        {' '}
        Phone:
        <input {...register('phone', { required: true })} placeholder="Phone" type="text" />
        {errors.phone && <span>This field is required</span>}
      </label>
      <input type="file" {...register('avatar')} placeholder="Avatar" />

      <input {...register('fullName', { required: true })} placeholder="Full Name" />
      {errors.fullName && <span>This field is required</span>}

      <input
        type="password"
        {...register('authentication.password', { required: true })}
        placeholder="Password"
      />
      {errors.authentication?.password && <span>This field is required</span>}

      <input {...register('deviceToken')} placeholder="Device Token" hidden=  />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;

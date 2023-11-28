import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

type FormData = {
  phoneNumber: string;
  avatar: File;
  fullName: string;
  isDriver: boolean;
  isActive: boolean;
  isAdmin: boolean;
  password: string;
  latitude: number;
  longitude: number;
};

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      // Call the API to process the data
      await api.processRegistration(data);
      // Handle success
      console.log('Registration successful');
    } catch (error) {
      // Handle error
      console.error('Registration failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Phone Number:
        <input type="text" name="phoneNumber" ref={register({ required: true })} />
        {errors.phoneNumber && <span>This field is required</span>}
      </label>

      <label>
        Avatar:
        <input type="file" name="avatar" ref={register({ required: true })} />
        {errors.avatar && <span>This field is required</span>}
      </label>

      <label>
        Full Name:
        <input type="text" name="fullName" ref={register({ required: true })} />
        {errors.fullName && <span>This field is required</span>}
      </label>

      <label>
        Is Driver:
        <select name="isDriver" ref={register({ required: true })}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        {errors.isDriver && <span>This field is required</span>}
      </label>

      <label>
        Is Active:
        <select name="isActive" ref={register({ required: true })}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        {errors.isActive && <span>This field is required</span>}
      </label>

      <label>
        Is Admin:
        <select name="isAdmin" ref={register({ required: true })}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        {errors.isAdmin && <span>This field is required</span>}
      </label>

      <label>
        Password:
        <input type="password" name="password" ref={register({ required: true })} />
        {errors.password && <span>This field is required</span>}
      </label>

      <label>
        Latitude:
        <input type="number" name="latitude" ref={register({ required: true })} />
        {errors.latitude && <span>This field is required</span>}
      </label>

      <label>
        Longitude:
        <input type="number" name="longitude" ref={register({ required: true })} />
        {errors.longitude && <span>This field is required</span>}
      </label>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;

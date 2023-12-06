'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IUser } from '../../models/interface';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { AuthService } from 'services';

const auth = new AuthService();

let user: IUser = {
  phone: '',
  avatar: '',
  fullName: '',
  isDriver: false,
  isActive: false,
  isAdmin: false,
  isVip: false,
  coordinate: { latitude: 0, longitude: 0 },
  authentication: { password: '', salt: '', sessionToken: '' },
  deviceToken: '',
};

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUser>();

  const onSubmit = async (data: IUser) => {
    try {
      await auth.Register(data);
      // Handle success
      console.log('Registration successful');
    } catch (error) {
      // Handle error
      console.error('Registration failed', error);
    }
  };

  const checkboxStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  };

  const input_style = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    width: '100%',
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" text-black">
      <label htmlFor="phone">
        {' '}
        Phone:
        {/* ... */}
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <PhoneInput
              placeholder="Phone"
              style={input_style}
              value={field.value}
              onChange={field.onChange}
            />
          )}
          {...register('phone', { required: true })}
        />
        {/* ... */}
        {errors.phone && <span>This field is required</span>}
      </label>
      <label htmlFor="file">
        {' '}
        Avatar:
        <input type="file" {...register('avatar')} placeholder="Avatar" style={input_style} />
      </label>

      <label htmlFor="fullName">
        {' '}
        Full Name:
        <input
          {...register('fullName', { required: true })}
          placeholder="Full Name"
          style={input_style}
        />
        {errors.fullName && <span>This field is required</span>}
      </label>

      <input
        type="password"
        {...register('authentication.password', { required: true })}
        placeholder="Password"
        style={input_style}
      />
      {errors.authentication?.password && <span>This field is required</span>}

      <div style={checkboxStyle}>
        <label htmlFor="isAdmin">
          Is Admin
          <input {...register('isAdmin')} type="checkbox" />
        </label>

        <label htmlFor="isDriver">
          Is Driver
          <input {...register('isDriver')} type="checkbox" />
        </label>

        <label htmlFor="isActive">
          Is Active
          <input {...register('isActive')} type="checkbox" />
        </label>
      </div>

      <button
        type="submit"
        className="px-5 py-4 bg-green-300 text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover: bg-green-500 hover:shadow-lg focus:bg-gray-100 focus:shadow-lg focus:outline-none focus:ring-0 active: bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;

'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { AuthService } from 'services';
import { useRouter } from 'next/router';

const auth = new AuthService();

interface ILoginData {
  phone: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginData>();

  const router = useRouter();

  const onSubmit = async (data: ILoginData, event: React.FormEvent) => {
    event.preventDefault();
    try {
      await auth.login(data.phone, data.password);
      // Handle success
      console.log('Login successful');
      router.push('/');
    } catch (error) {
      // Handle error
      console.error('Login failed', error);
    }
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

      <label htmlFor="password">
        {' '}
        Password:
        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Password"
          style={input_style}
        />
        {errors.password && <span>This field is required</span>}
      </label>

      <button
        type="submit"
        className="px-5 py-4 bg-green-300 text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover: bg-green-500 hover:shadow-lg focus:bg-gray-100 focus:shadow-lg focus:outline-none focus:ring-0 active: bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;

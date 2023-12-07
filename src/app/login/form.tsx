'use client';
import 'react-phone-number-input/style.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useState({
    phone: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.API_SERVER}/auth/login`, user);
      console.log(response.data);
      localStorage.setItem('token', response.data.authentication.sessionToken);
      // Handle success
      console.log('Login successful', response.data);
      toast.success('Login successful');
      router.push('/');
    } catch (error: any) {
      // Handle error
      console.error('Login failed', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.phone.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-0 py-2  bg-black">
      <h2>{loading ? 'Processing' : 'Sign In'}</h2>
      <form
        onSubmit={onLogin}
        className="flex flex-col items-center justify-center w-full px-4 bg-transparent border-0 rounded-lg shadow-lg border-cyan-500"
      >
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border border-gray-300 p-2 rounded-lg m-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          id="phone"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 p-2 rounded-lg m-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          id="password"
        />
        <button
          type="submit"
          disabled={buttonDisabled}
          className=" border border-gray-300 text-white font-bold py-2 px-4 rounded-2xl w-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent focus:bg-gray-200 hover:bg-gray-200 hover:text-black"
        >
          {buttonDisabled ? (
            'No Sign-In'
          ) : (
            <>
              <span> Sign-In</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

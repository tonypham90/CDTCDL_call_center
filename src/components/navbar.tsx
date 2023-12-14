'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthService } from 'services';
import { useEffect } from 'react';
import axios from '../axiosConfig';
import toast from 'react-hot-toast';
const Navbar: React.FC = () => {
  const auth = AuthService.getInstance();
  let [activeTab, setActiveTab] = useState<string>('Quản lý chuyến');
  let [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await auth.isLoggedIn();
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleLogout = async () => {
    // Remove the token from cookies
    const Response = await axios.post(`/auth/logout`, { message: 'logout' });
    if (Response.status === 200) {
      toast.success('Logout success', Response.data);
      console.log('Logout success', Response.data);
    } else {
      toast.error('Logout fail');
      console.log('Logout fail');
    }
    setIsLoggedIn(false);

    // Redirect to the home page
  };

  return (
    <div>
      <nav className="justify-between p-6">
        <ul className="flex items-center space-x-4">
          <li
            className={activeTab === 'Quản lý chuyến' ? 'active' : ''}
            onClick={() => handleTabClick('Quản lý chuyến')}
            style={{ margin: '0 1rem' }}
          >
            <Link href="/">Quản lý chuyến</Link>
          </li>
          <li
            className={activeTab === 'Lịch sử' ? 'active' : ''}
            onClick={() => handleTabClick('Lịch sử')}
            style={{ margin: '0 1rem' }}
          >
            <Link href="/history">Lịch sử</Link>
          </li>
          <li
            className={activeTab === 'admin' ? 'active' : ''}
            onClick={() => handleTabClick('admin')}
            style={{ margin: '0 1rem' }}
          >
            <Link href="/admin">admin</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li onClick={handleLogout}>Logout</li>
              <li>
                <Link href="/newaccount">Add User</Link>
              </li>
            </>
          ) : (
            <li
              className={activeTab === 'login' ? 'active' : ''}
              onClick={() => handleTabClick('login')}
              style={{ margin: '0 1rem' }}
            >
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div> // <Navbar
  );
};

export default Navbar;

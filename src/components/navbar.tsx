'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { AuthService } from 'services';
import { useEffect } from 'react';
import { set } from 'react-hook-form';
import axios from '../axiosConfig';
import toast from 'react-hot-toast';
const Navbar: React.FC = () => {
  let auth = new AuthService();
  let [activeTab, setActiveTab] = useState<string>('Quản lý chuyến');
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  const setIsLoggedInState = async () => {
    setIsLoggedIn(await auth.isLoggedIn());
  };

  const handleLogout = async () => {
    // Remove the token from cookies
    const Response = await axios.post(`/auth/logout`, { token: Cookies.get('token') });
    if (Response.status === 200) {
      toast.success('Logout success');
      console.log('Logout success');
    }

    // Redirect to the home page
  };
  setIsLoggedInState();

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

'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { AuthService } from 'services';
import {router} from "next/client";

const Navbar: React.FC = () => {
  let auth = new AuthService();
  let [activeTab, setActiveTab] = useState<string>('Quản lý chuyến');
  const router = useRouter();
  let [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn());

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove('token');

    // Set isLoggedIn to false
    setIsLoggedIn(auth.isLoggedIn());
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
                <Link href="/register">Add User</Link>
              </li>
            </>
          ) : (
            <li className={activeTab === 'login' ? 'active' : ''}>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div> // <Navbar
  );
};

export default Navbar;
function setShowLoginForm(arg0: boolean) {
  router.push('/login')
}

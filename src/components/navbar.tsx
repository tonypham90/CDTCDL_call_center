'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { FaUser } from 'react-icons/fa';
import { UserButton } from '@clerk/nextjs';

// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   NavbarMenuToggle,
//   NavbarMenu,
//   NavbarMenuItem,
// } from '@nextui-org/react';

const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Quản lý chuyến');
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove('token');

    // Set isLoggedIn to false
    setIsLoggedIn(false);
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
              <li onClick={handleRegisterClick}>Register</li>
            </>
          ) : (
            <li
              className={activeTab === 'login' ? 'active' : ''}
              onClick={() => {
                handleTabClick('login');
                // handleLoginClick();
              }}
              style={{ margin: '0 1rem' }}
            >
              <Link href="/login">
                Login <FaUser />
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {showLoginForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
      {showRegisterForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <RegisterForm />
        </div>
      )}
    </div> // <Navbar
  );
};

export default Navbar;

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

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
    <nav>
      <ul>
        <li
          className={activeTab === 'Quản lý chuyến' ? 'active' : ''}
          onClick={() => handleTabClick('Quản lý chuyến')}
        >
          <Link href="/">Quản lý chuyến</Link>
        </li>
        <li
          className={activeTab === 'Lịch sử' ? 'active' : ''}
          onClick={() => handleTabClick('Lịch sử')}
        >
          <Link href="/history">Lịch sử</Link>
        </li>
        <li
          className={activeTab === 'admin' ? 'active' : ''}
          onClick={() => handleTabClick('admin')}
        >
          <Link href="/admin">admin</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li onClick={handleLogout}>Logout</li>
            <li onClick={handleRegisterClick}>Register</li>
          </>
        ) : (
          <>
            <li onClick={handleLoginClick}>Login</li>
          </>
        )}
        {showLoginForm && <LoginForm />}
        {showRegisterForm && <RegisterForm />}
      </ul>
    </nav>
  );
};

export default Navbar;

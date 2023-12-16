'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthService } from 'services';
import { useEffect } from 'react';
import axios from '../axiosConfig';
import toast from 'react-hot-toast';
import webstruct from '../data/webstruct.json';
import { IPageInformation } from 'models/interface';
import { set } from 'react-hook-form';
import {usePathname, useRouter} from 'next/navigation';



const data:IPageInformation[] = webstruct;
const Navbar: React.FC = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const auth = AuthService.getInstance();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [RenderItem,setRenderItem] = useState<IPageInformation[]>([]);
  useEffect(() => {
    const handlecheckLogin = async () => { const result = await auth.isLoggedIn();
    setIsLoggedIn(result);};
    handlecheckLogin();
    setRenderItem(data.filter(item => item.info.isProtected === isLoggedIn && item.info.isNavbar === true));
    },[isLoggedIn,auth]);
    

  return (
      <nav className="justify-between p-6">
        <ul className="flex items-center space-x-4">
          {RenderItem.map((item, index) => (
            <li
              key={index}
              className={currentPath === item.info.path ? 'active' : ''}
              
              style={{ margin: '0 1rem' }}
            >
              <Link href={item.info.path}>{item.info.navbarName}</Link>
            </li>
          ))  
          }
          {/* <li
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
          )} */}
        </ul>
      </nav>
// <Navbar
  );
};

export default Navbar;

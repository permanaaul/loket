'use client';

import Link from 'next/link';
import { FaHome, FaSearch, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useRouter } from 'next/navigation';
import type { RootState } from '../redux/store';
import { Menu } from '@headlessui/react';

export const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    router.push('/login');
  };

  return (
    <header className="bg-black text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <Link href="/" passHref>
            <span className="hover:text-gray-400 transition duration-300 cursor-pointer">My App</span>
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-8 text-lg items-center">
            <li className="flex items-center space-x-2">
              <FaHome />
              <Link href="/" passHref>
                <span className="hover:text-gray-400 transition duration-300 cursor-pointer">Home</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <FaSearch />
              <Link href="/explore" passHref>
                <span className="hover:text-gray-400 transition duration-300 cursor-pointer">Explore</span>
              </Link>
            </li>
            
            {isAuthenticated ? (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex items-center space-x-2">
                  <span>Welcome, {user?.username}!</span>
                </Menu.Button>
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900">Balance: IDR {user?.wallet?.toLocaleString()}</span>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/wallet">
                          <span className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}>
                            Top Up Wallet
                          </span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            ) : (
              <>
                <li className="flex items-center space-x-2">
                  <FaSignInAlt />
                  <Link href="/login" passHref>
                    <span className="hover:text-gray-400 transition duration-300 cursor-pointer">Login</span>
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaUserPlus />
                  <Link href="/register" passHref>
                    <span className="hover:text-gray-400 transition duration-300 cursor-pointer">Register</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

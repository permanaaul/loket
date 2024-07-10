'use client';

import Link from 'next/link';
import { FaHome, FaSearch, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useRouter } from 'next/navigation';
import type { RootState } from '../redux/store';

export const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  console.log('Authenticated User in Header:', user); // Log untuk memeriksa user data

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
              <>
                <li className="flex items-center space-x-2">
                  <span>Welcome, {user?.username}!</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                    Logout
                  </button>
                </li>
              </>
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

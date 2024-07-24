'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import api from '@/utils/api';
import { FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa';

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema)
  });
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post('/api/auth/login', data);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      dispatch(login(user));
      console.log('Login successful:', response.data);
      router.push('/');
    } catch (error: any) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img src="/images/bglogin.jpg" alt="Login Background" className="object-cover w-full h-full" />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="flex justify-center mb-6">
            <FaUserCircle className="text-6xl text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block font-semibold">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200 transition duration-300">
                <FaEnvelope className="ml-3" />
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-3 py-2 border-none focus:ring-0"
                  placeholder="Email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-6">
              <label className="block font-semibold">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200 transition duration-300">
                <FaLock className="ml-3" />
                <input
                  {...register('password')}
                  type="password"
                  className="w-full px-3 py-2 border-none focus:ring-0"
                  placeholder="Password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

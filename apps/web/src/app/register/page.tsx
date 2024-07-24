'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaEnvelope, FaLock, FaUser, FaUserShield } from 'react-icons/fa';
import api from '@/utils/api';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: yup.string().oneOf(['CUSTOMER', 'ADMIN']).required('Role is required')
});

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(schema) as any
  });
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await api.post('/api/auth/register', data);
      console.log('Registration successful:', response.data);
      router.push('/login');
    } catch (error: any) {
      console.error('Error registering:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="/images/bglogin.jpg"
            alt="Background Image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8 lg:pl-12">
          <div className="flex justify-center mb-6">
            <FaUser className="text-6xl text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Username</label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition duration-300">
                <FaUser className="text-gray-500 ml-3" />
                <input
                  {...register('username')}
                  type="text"
                  className="w-full px-3 py-2 border-none focus:ring-0"
                  placeholder="Username"
                />
              </div>
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition duration-300">
                <FaEnvelope className="text-gray-500 ml-3" />
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
              <label className="block text-gray-700 font-semibold">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition duration-300">
                <FaLock className="text-gray-500 ml-3" />
                <input
                  {...register('password')}
                  type="password"
                  className="w-full px-3 py-2 border-none focus:ring-0"
                  placeholder="Password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold">Role</label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition duration-300">
                <FaUserShield className="text-gray-500 ml-3" />
                <select
                  {...register('role')}
                  className="w-full px-3 py-2 border-none focus:ring-0"
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

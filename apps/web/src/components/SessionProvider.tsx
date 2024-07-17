'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import api from '@/utils/api';

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        const user = response.data;
        dispatch(login(user));
      })
      .catch(error => {
        console.error('Failed to restore session:', error);
        localStorage.removeItem('token'); // Hapus token yang tidak valid
      });
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default SessionProvider;

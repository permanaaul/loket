// web/src/components/ClientProvider.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import api from '@/utils/api';
import { Provider } from 'react-redux';
import store from '../redux/store';

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ClientContent>{children}</ClientContent>
    </Provider>
  );
};

const ClientContent = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUser(response.data));
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    checkUser();
  }, [dispatch]);

  return <>{children}</>;
};

export default ClientProvider;

// wallet/page.tsx
'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import api from '../../utils/api';
import { setUser } from '../../redux/authSlice';

const Wallet = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [amount, setAmount] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // State for success or failure message
  const dispatch = useDispatch();

  const handleTopUp = async () => {
    if (amount === null || amount <= 0) {
      setMessage('Please enter a valid amount');
      setIsSuccess(false);
      return;
    }

    try {
      const response = await api.post('api/wallet/topup', {
        userId: user?.id,
        amount,
      });

      setMessage('Top up successful');
      setIsSuccess(true);
      dispatch(setUser(response.data)); // Update user in redux store
    } catch (error) {
      console.error('Top up error:', error);
      setMessage('Top up failed. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Wallet</h1>
        <p className="text-xl mb-4">
          Current Balance: IDR {user?.wallet ? user.wallet.toLocaleString() : '0'}
        </p>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Top Up Amount</label>
          <input
            type="number"
            value={amount ?? ''}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleTopUp}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Top Up
        </button>
        {message && (
          <p className={`mt-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Wallet;

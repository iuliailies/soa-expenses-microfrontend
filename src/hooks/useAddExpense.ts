import { useState } from 'react';
import apiClient from '../helpers/axiosInstance';

const useAddExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addExpense = async (expense: { category: string; amount: number; date: string }) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/api/expenses', expense, {
        // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzIzNjg1NDEsInVzZXJfaWQiOjF9.5fajBoeIUiDQgAZiBYj0qOAySEkbTh97P8-fpyt8v6Y` },
      });
      setError(null);
      return response.data; // Return the created expense
    } catch (err) {
      setError('Failed to add expense');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addExpense, loading, error };
};

export default useAddExpense;

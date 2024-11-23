import { useEffect, useState } from 'react';
import { Expense } from '../types/expense';
import apiClient from '../helpers/axiosInstance';

const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/api/expenses', {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        });
        setExpenses(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch expenses');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return { expenses, loading, error };
};

export default useFetchExpenses;

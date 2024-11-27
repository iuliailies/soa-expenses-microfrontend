import { useState } from 'react';
import apiClient from "../helpers/axiosInstance";

const useDeleteExpense = () => {
  const [error, setError] = useState<string | null>(null);

  const deleteExpense = async (id: string) => {
    try {
      setError(null); 
      await apiClient.delete(`api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
      }); 
    } catch (err) {
      setError('Failed to delete expense. Please try again.');
    }
  };

  return { deleteExpense, error };
};

export default useDeleteExpense;

import apiClient from '../helpers/axiosInstance';

const useFetchExpenses = () => {
  const fetchExpenses = async () => {
    try {
      const response = await apiClient.get('/api/expenses', {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
      });
      return response.data;
    } catch (err) {
      throw new Error('Failed to fetch expenses');
    }
  };

  return { fetchExpenses };
};

export default useFetchExpenses;

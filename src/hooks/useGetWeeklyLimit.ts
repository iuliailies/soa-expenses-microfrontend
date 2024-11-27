import { useState, useEffect } from "react";
import apiClient from "../helpers/axiosInstance";

const useGetWeeklyLimit = () => {
  const [weeklyLimit, setWeeklyLimit] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeeklyLimit = async () => {
      try {
        setError(null);
        const response = await apiClient.get("api/users/limit", {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
          }); 
        setWeeklyLimit(response.data.weekly_limit);
      } catch (err) {
        setError("Failed to fetch weekly limit.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyLimit();
  }, []);

  return { weeklyLimit, loading, error };
};

export default useGetWeeklyLimit;

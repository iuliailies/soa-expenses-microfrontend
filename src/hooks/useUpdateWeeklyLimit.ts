import { useState } from "react";
import apiClient from "../helpers/axiosInstance";

interface UseUpdateWeeklyLimitResult {
  updateWeeklyLimit: (newLimit: number) => Promise<void>;
  error: string | null;
}

const useUpdateWeeklyLimit = (): UseUpdateWeeklyLimitResult => {
  const [error, setError] = useState<string | null>(null);

  const updateWeeklyLimit = async (newLimit: number) => {
    try {
      setError(null);
      await apiClient.put(`/api/users/limit`, {
        new_limit: newLimit,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
      });
    } catch (err) {
      setError("Failed to update the weekly limit. Please try again.");
    }
  };

  return { updateWeeklyLimit, error };
};

export default useUpdateWeeklyLimit;

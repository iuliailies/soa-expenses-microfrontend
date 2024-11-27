import apiClient from "../helpers/axiosInstance";

const useAuth = () => {
  const logout = async () => {
    try {
      await apiClient.get("/auth/logout", {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
      }); // Call logout API
    } catch (err) {
      console.error("Failed to logout:", err);
    } finally {
      localStorage.removeItem("jwtToken"); // Clear the token
      window.location.href = "/login"; 
    }
  };

  return { logout };
};

export default useAuth;
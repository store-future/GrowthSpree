import { useEffect } from "react";


export const API_BASE_URL = "http://localhost:8000"; 

export const getAccessToken = () => localStorage.getItem("access_token");

export const getRefreshToken = () => localStorage.getItem("refresh_token");

export const saveTokens = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// 🔹 Function to refresh access token if expired
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await response.json();
    if (response.ok) {
      saveTokens(data.access, refreshToken);
      return data.access;
    } else {
      clearTokens();
      return null;
    }
  } catch (error) {
    clearTokens();
    return null;
  }
};



const Logout = () => {
    useEffect(() => {
      // 🔹 Remove tokens from localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
  
      // 🔹 Refresh the page after logout
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, []);
  
    return null; // No need to render anything
  };
  
  export default Logout;
  


export const verifyRefreshToken = async (refreshToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access); // Store new access token
        return true; // Refresh token is valid
      }
    } catch (error) {
      console.error("Refresh Token Error:", error);
    }
    return false; // Refresh token is invalid or expired
};
  
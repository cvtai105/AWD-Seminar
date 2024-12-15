import React, { createContext, useState, useEffect, useContext } from "react";

export const AppContext = createContext(); // Tạo context mới
export const AppContextProvider = ({ children }) => {
  const [jwt, setJwt] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);   //user data must included in jwt token

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      login(token, refreshToken);
    }
  }, []);

  const login = (access_token, refresh_token) => {
    localStorage.setItem("refreshToken", refresh_token);
    //decode token to get user data
    setJwt(access_token);
    const base64Url = access_token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const userData = JSON.parse(atob(base64));
    setUserData(userData);
    console.log("User Data: ", userData);
    setIsAuthenticated(true);
    console.log("Logged In: ", isAuthenticated);
    localStorage.setItem("accessToken", access_token);
  };

  const logout = () => {
    setUserData(null);
    setJwt(null);
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  async function fetchWithAuth(url, options = {}) {
    //TODO: handle refresh token
    console.log("Fetch with auth header:", url, options);
    const config = {
      ...options,
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    };

    console.log("Fetch with auth header:", config);

    try {
      const response = await fetch(url, config);
      if (!response.status === 401) {
        //get refresh token
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token found");
        }
        //fetch new access token
        const response2 = await fetch(
          `${process.env.REACT_APP_API_URL}/api/auth/refresh?token=${refreshToken}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response2.ok) {
          throw new Error("Failed to refresh token");
        }
        const data = await response2.json();
        login(data.access_token, data.refresh_token);
        //retry fetch
        const response3 = await fetch(url, config);
        if (!response3.ok) {
          throw new Error(`HTTP error! Status: ${response3.status}`);
        }
        return await response3.json();
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch with auth header failed:", error);
      throw error; // Re-throw error for caller to handle
    }
  }

  return (
    <AppContext.Provider
      value={{ jwt, userData, isAuthenticated, login, logout, fetchWithAuth }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);

import { createContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "../axiosInstance.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(token));
    }
  }, []);

  const register = async (data) => {
    try {
      const { confirmPassword, ...rest } = data;
      const res = await axiosInstance.post("register", rest);
      sessionStorage.setItem("token", JSON.stringify(res));
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (data) => {
    try {
      const res = await axiosInstance.post("login", data);
      sessionStorage.setItem("token", JSON.stringify(res));
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      register,
      login,
      logout,
    }),
    [user, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

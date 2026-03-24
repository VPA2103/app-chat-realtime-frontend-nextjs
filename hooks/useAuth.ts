"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";

interface AuthData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: any;
}

export function useAuth() {
  const [authLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true, // gửi cookie nếu backend set
    headers: { "Content-Type": "application/json" },
  });

  const handleError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.error || "Có lỗi xảy ra, thử lại sau");
      console.error("Axios error:", err.response?.data || err.message);
    } else {
      setError("Có lỗi xảy ra, thử lại sau");
      console.error("Unexpected error:", err);
    }
  };

  const login = async (data: AuthData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.post<AuthResponse>("/auth/login", data);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token); // hoặc httpOnly cookie backend set
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: AuthData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.post<AuthResponse>("/auth/register", data);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    // nếu backend set cookie, gọi api /logout
  };

  return { user, authLoading, error, login, register, logout };
}
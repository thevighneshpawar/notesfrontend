import React, { useContext, useState, useEffect, type ReactNode } from "react";
import { getMe, logout as apiLogout } from "../api/auth";
import { AuthContext, type User } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // Set user after OTP verify
  const login = (user: User) => {
    setUser(user);
  };

  // Clear cookies + reset state
  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  // Restore user on first load
  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true);
        const me = await getMe();
        console.log("Fetched user:", me);

        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

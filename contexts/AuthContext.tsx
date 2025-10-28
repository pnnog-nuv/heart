"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User, login as authLogin, logout as authLogout, getUser, getToken, saveAuth } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication on mount
  useEffect(() => {
    const token = getToken();
    const userData = getUser();

    if (token && userData) {
      setUser(userData);
    }

    setIsLoading(false);
  }, []);

  // Protect routes - redirect to login if not authenticated
  useEffect(() => {
    if (isLoading) return;

    const isLoginPage = pathname === "/login";
    const isAuthenticated = !!user;

    // Se não está autenticado e não está na página de login, redireciona
    if (!isAuthenticated && !isLoginPage) {
      router.push("/login");
    }

    // Se está autenticado e está na página de login, redireciona para home
    if (isAuthenticated && isLoginPage) {
      router.push("/");
    }
  }, [user, pathname, isLoading, router]);

  const login = async (email: string, password: string) => {
    try {
      const response = await authLogin(email, password);

      if (response.success && response.token && response.user) {
        saveAuth(response.token, response.user);
        setUser(response.user);
        router.push("/");
        return { success: true };
      }

      return { success: false, error: response.error || "Erro ao fazer login" };
    } catch (error) {
      return { success: false, error: "Erro inesperado ao fazer login" };
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

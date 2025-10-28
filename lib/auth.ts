"use client";

const TOKEN_KEY = "blue-saude-auth-token";
const USER_KEY = "blue-saude-user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

/**
 * Mock login function
 * In production, this would call a real API
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock validation - aceita qualquer email/senha com mais de 3 caracteres
  if (!email || !password || password.length < 3) {
    return {
      success: false,
      error: "Email e senha são obrigatórios",
    };
  }

  // Generate mock token
  const token = `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Create mock user based on email
  const user: User = {
    id: `user-${Date.now()}`,
    name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    email: email,
    role: "admin",
  };

  return {
    success: true,
    token,
    user,
  };
}

/**
 * Save auth data to localStorage
 */
export function saveAuth(token: string, user: User): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Get auth token from localStorage
 */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get user from localStorage
 */
export function getUser(): User | null {
  if (typeof window === "undefined") return null;

  const userData = localStorage.getItem(USER_KEY);
  if (!userData) return null;

  try {
    return JSON.parse(userData) as User;
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Logout - clear auth data
 */
export function logout(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Validate token (mock)
 * In production, this would validate with backend
 */
export async function validateToken(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;

  // Mock validation - check if token exists and is not expired
  // In production, call API to validate
  return true;
}

import { createContext, useState } from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  setUser: (username: string) => void;
  user: string;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState("");
  const isAuthenticated = !!user;

  const value = {
    isAuthenticated,
    setUser,
    user,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

import { createContext, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return {
    currentUser: {
      name: "Admin User",
      email: "admin@example.com",
      role: "admin"
    },
    login: () => {},
    logout: () => {},
    isAuthenticated: true
  };
}

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={useAuth()}>
      {children}
    </AuthContext.Provider>
  );
}
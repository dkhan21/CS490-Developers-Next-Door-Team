// MockAuthProvider.js
import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children, isAuthenticated = false, currentUser = null }) => {
  const logIn = () => {
    // Mock login logic
  };

  const logOut = () => {
    // Mock logout logic
  };

  const authState = {
    isAuthenticated,
    currentUser,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };

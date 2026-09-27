// AuthContext.jsx - keeps track of WHO is logged in, for the whole app.
// "Context" is React's way to share data with every page without passing
// it down through props one level at a time.

import { createContext, useEffect, useState } from 'react';
import { sampleUser } from '../services/sampleData';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // null = nobody is logged in
  const [user, setUser] = useState(null);

  // For now (Step 2) these functions just pretend.
  // In Step 7 they will call the backend API and store the JWT token.
  function login(email) {
    setUser({ ...sampleUser, email });
  }

  function register(name, email) {
    setUser({ ...sampleUser, name, email });
  }

  function logout() {
    setUser(null);
  }

  // Merge changed fields into the user, e.g. updateUser({ weight: 68 })
  function updateUser(changes) {
    setUser((previous) => ({ ...previous, ...changes }));
  }

  // Apply the Dark mode setting: <html data-theme="light"> switches the CSS colors.
  const theme = user && !user.darkMode ? 'light' : 'dark';
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

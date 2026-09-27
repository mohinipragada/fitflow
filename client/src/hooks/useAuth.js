// useAuth.js - a custom hook: a shortcut any page can call to get the logged-in user.
// Usage:  const { user, login, logout } = useAuth();

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  return useContext(AuthContext);
}

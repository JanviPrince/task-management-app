import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { MOCK_USER } from '../lib/mockData';

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('taskflow_auth');
    return saved ? JSON.parse(saved) : { user: null, isAuthenticated: false };
  });

  useEffect(() => {
    localStorage.setItem('taskflow_auth', JSON.stringify(auth));
  }, [auth]);

  const login = (email: string) => {
    // Basic mock login - accept any email for demo
    const user: User = { ...MOCK_USER, email };
    setAuth({ user, isAuthenticated: true });
    return true;
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
  };

  return { ...auth, login, logout };
}

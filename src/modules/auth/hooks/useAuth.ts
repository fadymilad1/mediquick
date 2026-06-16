import { useCallback, useState } from 'react';
import { useAuthStore } from '../../../store';
import { User } from '../../../types/models';
import { loginUser, registerUser } from '../api/authApi';

export function useAuth() {
  const setUser = useAuthStore(state => state.setUser);
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const loggedIn = await loginUser(email, password);
        await setUser(loggedIn);
        return loggedIn;
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Login failed';
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [setUser],
  );

  const register = useCallback(
    async (payload: {
      name: string;
      email: string;
      password: string;
      phone?: string;
    }) => {
      setLoading(true);
      setError(null);
      try {
        const newUser = await registerUser(payload);
        await setUser(newUser);
        return newUser;
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Registration failed';
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [setUser],
  );

  return { login, register, logout, user, loading, error, clearError: () => setError(null) };
}

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

interface UserProfile {
  display_name: string;
  created_at: string;
}

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextValue {
  user: UserProfile | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, display_name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const API_BASE = import.meta.env['VITE_API_URL'] ?? '';

async function fetchMe(): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/me`, { credentials: 'include' });
    if (!res.ok) return null;
    return (await res.json()) as UserProfile;
  } catch {
    return null;
  }
}

async function postJson(url: string, body: unknown): Promise<Response> {
  return fetch(`${API_BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  // On mount — check if there's an existing session cookie
  useEffect(() => {
    fetchMe().then((profile) => {
      setUser(profile);
      setStatus(profile ? 'authenticated' : 'unauthenticated');
    });
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    const res = await postJson('/api/auth/login', { email, password });
    if (!res.ok) {
      const body = (await res.json()) as { error: string };
      throw new Error(body.error);
    }
    const profile = await fetchMe();
    setUser(profile);
    setStatus(profile ? 'authenticated' : 'unauthenticated');
  }, []);

  const signup = useCallback(
    async (email: string, password: string, display_name: string): Promise<void> => {
      const res = await postJson('/api/auth/signup', { email, password, display_name });
      if (!res.ok) {
        const body = (await res.json()) as { error: string };
        throw new Error(body.error);
      }
      const profile = await fetchMe();
      setUser(profile);
      setStatus(profile ? 'authenticated' : 'unauthenticated');
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    await fetch(`${API_BASE}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  return (
    <AuthContext.Provider value={{ user, status, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

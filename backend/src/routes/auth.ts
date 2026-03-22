import { Router, Request, Response } from 'express';
import { supabaseAdmin, supabaseAnon } from '../lib/supabase';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

const COOKIE_NAME = 'sb-access-token';

const cookieOptions = {
  httpOnly: true,
  secure: process.env['NODE_ENV'] === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
  path: '/',
};

interface SignupBody {
  email: string;
  password: string;
  display_name: string;
}

interface LoginBody {
  email: string;
  password: string;
}

router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  const { email, password, display_name } = req.body as SignupBody;

  if (!email || !password || !display_name) {
    res.status(400).json({ error: 'Email, password, and display name are required' });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters' });
    return;
  }

  if (display_name.trim().length < 2) {
    res.status(400).json({ error: 'Display name must be at least 2 characters' });
    return;
  }

  // admin.createUser passes display_name into raw_user_meta_data.
  // The existing Postgres trigger handle_new_user() reads this to populate profiles.display_name.
  const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    user_metadata: { display_name: display_name.trim() },
    email_confirm: true, // skip email verification — user can log in immediately
  });

  if (createError) {
    res.status(400).json({ error: createError.message });
    return;
  }

  // Sign in immediately to get a session token for the cookie
  const { data: sessionData, error: signInError } = await supabaseAnon.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError || !sessionData.session) {
    res.status(400).json({ error: 'Account created but sign-in failed. Please log in.' });
    return;
  }

  res.cookie(COOKIE_NAME, sessionData.session.access_token, cookieOptions);
  res.json({ user: { id: userData.user.id, email: userData.user.email } });
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as LoginBody;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    // Generic message — never reveal whether the email exists
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  res.cookie(COOKIE_NAME, data.session.access_token, cookieOptions);
  res.json({ user: { id: data.user.id, email: data.user.email } });
});

router.get('/me', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('display_name, created_at')
    .eq('id', req.userId!)
    .single();

  if (error || !data) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }

  res.json({ display_name: data.display_name as string, created_at: data.created_at as string });
});

router.post('/logout', (_req: Request, res: Response): void => {
  res.clearCookie(COOKIE_NAME, { path: '/' });
  res.json({ message: 'Logged out' });
});

export default router;

import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../lib/supabase';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = (req.cookies as Record<string, string | undefined>)['sb-access-token'];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: 'Invalid or expired session' });
    return;
  }

  req.userId = data.user.id;
  next();
}

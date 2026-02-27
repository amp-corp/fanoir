import { cookies } from 'next/headers';
import { createHash } from 'crypto';

const COOKIE_NAME = 'admin_token';

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export function generateToken(): string {
  const secret = process.env.ADMIN_PASSWORD!;
  return hashPassword(secret + Date.now().toString());
}

export function getExpectedToken(): string {
  const secret = process.env.ADMIN_PASSWORD!;
  return hashPassword(secret);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return token === getExpectedToken();
}

export { COOKIE_NAME };

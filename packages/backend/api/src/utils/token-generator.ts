import crypto from 'node:crypto';

export function tokenGenerator() {
  const randomBytes = crypto.randomBytes(6);
  const randomHex = randomBytes.toString('hex');

  return randomHex.slice(0, 6).toUpperCase();
}

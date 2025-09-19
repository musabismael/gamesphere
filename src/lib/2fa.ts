import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { prisma } from './prisma';

export interface TwoFactorSetup {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface TwoFactorVerification {
  isValid: boolean;
  backupCodeUsed?: boolean;
}

/**
 * Generate a new 2FA secret and QR code for setup
 */
export async function generateTwoFactorSecret(userId: string): Promise<TwoFactorSetup> {
  const secret = speakeasy.generateSecret({
    name: `GameSphere (${userId})`,
    issuer: 'GameSphere',
    length: 32
  });

  // Generate backup codes
  const backupCodes = generateBackupCodes();

  // Generate QR code
  const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

  return {
    secret: secret.base32,
    qrCodeUrl,
    backupCodes
  };
}

/**
 * Verify a 2FA token
 */
export async function verifyTwoFactorToken(
  userId: string, 
  token: string
): Promise<TwoFactorVerification> {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user || !user.twoFactorSecret) {
    return { isValid: false };
  }

  // Check if account is locked
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return { isValid: false };
  }

  // Verify TOTP token
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token: token,
    window: 2 // Allow 2 time steps (60 seconds) tolerance
  });

  if (verified) {
    // Reset login attempts on successful verification
    await prisma.user.update({
      where: { id: userId },
      data: {
        loginAttempts: 0,
        lockedUntil: null,
        lastLogin: new Date()
      }
    });

    return { isValid: true };
  }

  // Check backup codes
  if (!user.backupCodes || !Array.isArray(user.backupCodes)) {
    return { isValid: false };
  }
  
  const backupCodes = user.backupCodes as string[];
  const backupCodeIndex = backupCodes.indexOf(token);
  if (backupCodeIndex !== -1) {
    // Remove used backup code
    const newBackupCodes = [...backupCodes];
    newBackupCodes.splice(backupCodeIndex, 1);

    await prisma.user.update({
      where: { id: userId },
      data: {
        backupCodes: newBackupCodes,
        loginAttempts: 0,
        lockedUntil: null,
        lastLogin: new Date()
      }
    });

    return { isValid: true, backupCodeUsed: true };
  }

  // Increment failed attempts
  const newAttempts = user.loginAttempts + 1;
  const shouldLock = newAttempts >= 5;
  
  await prisma.user.update({
    where: { id: userId },
    data: {
      loginAttempts: newAttempts,
      lockedUntil: shouldLock ? new Date(Date.now() + 15 * 60 * 1000) : null // Lock for 15 minutes
    }
  });

  return { isValid: false };
}

/**
 * Enable 2FA for a user
 */
export async function enableTwoFactor(
  userId: string, 
  secret: string, 
  token: string
): Promise<boolean> {
  // Verify the token before enabling
  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window: 2
  });

  if (!verified) {
    return false;
  }

  // Generate backup codes
  const backupCodes = generateBackupCodes();

  // Enable 2FA
  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFactorEnabled: true,
      twoFactorSecret: secret,
      backupCodes: backupCodes
    }
  });

  return true;
}

/**
 * Disable 2FA for a user
 */
export async function disableTwoFactor(userId: string, token: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user || !user.twoFactorSecret) {
    return false;
  }

  // Verify token before disabling
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token: token,
    window: 2
  });

  if (!verified) {
    return false;
  }

  // Disable 2FA
  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFactorEnabled: false,
      twoFactorSecret: null,
      backupCodes: []
    }
  });

  return true;
}

/**
 * Generate new backup codes
 */
export async function generateNewBackupCodes(userId: string): Promise<string[]> {
  const backupCodes = generateBackupCodes();
  
  await prisma.user.update({
    where: { id: userId },
    data: {
      backupCodes: backupCodes
    }
  });

  return backupCodes;
}

/**
 * Generate backup codes
 */
function generateBackupCodes(): string[] {
  const codes: string[] = [];
  for (let i = 0; i < 10; i++) {
    codes.push(generateRandomCode());
  }
  return codes;
}

/**
 * Generate a random backup code
 */
function generateRandomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

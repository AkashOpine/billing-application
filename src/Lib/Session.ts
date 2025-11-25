import CryptoJS from 'crypto-js';

const SECRET_KEY = 'A1b2C3d4E5f6G7h8I9j0K!l@M#n$O%p^Q&r*S(t)U_v-W+x=Y{z]';
const Key = 'cost-estimation-data';
export const TokenKey = 'cost-estimation-token';

type SessionData = {
  [key: string]: any;
};

// Encrypt function
const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// Decrypt function
const decryptData = (cipherText: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

// Set Token with encryption
export const SetToken = (token: string, storageType: 'session' | 'local'): void => {
  const encryptedToken = encryptData(token);
  if (storageType === 'session') {
    sessionStorage.setItem(TokenKey, encryptedToken);
  } else {
    localStorage.setItem(TokenKey, encryptedToken);
  }
};

// Get Token with decryption
export const GetToken = (): string | undefined => {
  const encryptedToken = localStorage.getItem(TokenKey) || sessionStorage.getItem(TokenKey);
  return encryptedToken ? decryptData(encryptedToken) || undefined : undefined;
};

// Clear session
export const ClearSession = (): void => {
  localStorage.removeItem(Key);
  localStorage.removeItem(TokenKey);
  sessionStorage.removeItem(Key);
  sessionStorage.removeItem(TokenKey);
};

// Get session data
export const GetSession = (): SessionData | null => {
  const encryptedSession = localStorage.getItem(Key) || sessionStorage.getItem(Key);
  if (!encryptedSession) return null;

  const decryptedSession = decryptData(encryptedSession);
  return decryptedSession ? JSON.parse(decryptedSession) : null;
};

// Set session with encryption
export const SetSession = (data: SessionData): void => {
  const storage = localStorage.getItem(TokenKey) ? localStorage : sessionStorage;
  const encryptedData = encryptData(JSON.stringify(data));
  storage.setItem(Key, encryptedData);
};

// Mutate session with encryption
export const mutateSession = (data: SessionData): void => {
  const storage = localStorage.getItem(TokenKey) ? localStorage : sessionStorage;
  const encryptedSession = storage.getItem(Key);

  if (encryptedSession) {
    const decryptedSession = decryptData(encryptedSession);
    if (decryptedSession) {
      const parsedSession: SessionData = JSON.parse(decryptedSession);
      const updatedSession = {
        ...parsedSession,
        ...data,
      };
      const encryptedData = encryptData(JSON.stringify(updatedSession));
      storage.setItem(Key, encryptedData);
    }
  }
};

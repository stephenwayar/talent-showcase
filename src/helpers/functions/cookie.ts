import Cookies from 'js-cookie';
import { decryptData, encryptData } from './encryption';

// Store encrypted data in cookies
export function setCookieItem(key: string, value: any) {
  Cookies.set(key, encryptData(value), { expires: 1 });
}

// Retrieve and decrypt data from cookies
export function getCookieItem(key: string) {
  const value = Cookies.get(key);

  if (typeof value === 'string') {
    return decryptData(value);
  }

  return null;
}
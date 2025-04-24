import Cookies from 'js-cookie';
import { decryptData, encryptData } from './encryption';

export function setCookieItem(key: string, value: any) {
  Cookies.set(key, encryptData(value), { expires: 1 });
}

export function getCookieItem(key: string) {
  const value = Cookies.get(key);

  if (typeof value === 'string') {
    return decryptData(value);
  }
  return null;
}
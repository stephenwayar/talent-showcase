import { encryptionKey } from '@/config/env';
import CryptoJS from 'crypto-js';

// Encrypt data using AES encryption
export function encryptData(data: any): string {
  const dataString: string = JSON.stringify(data);
  const encryptedData: string = encryptionKey ? CryptoJS.AES.encrypt(dataString, encryptionKey).toString() : '';

  return encryptedData;
}

// Decrypt AES encrypted data
export function decryptData(encryptedData: string): any {
  const decryptedData: string = encryptionKey ? CryptoJS.AES.decrypt(encryptedData, encryptionKey).toString(CryptoJS.enc.Utf8) : '';
  const data: any = JSON.parse(decryptedData);

  return data;
}
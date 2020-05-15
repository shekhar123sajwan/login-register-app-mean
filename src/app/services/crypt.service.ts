import { ConfigService } from './config.services';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptService {
  encryptData(plainText: string) {
    return new Promise((resolve, reject) => {
      try {
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(plainText),
          ConfigService.SECRET
        ).toString();
        resolve(encryptedData);
      } catch (e) {
        reject(e);
      }
    });
  }

  decryptData(encryptedText: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, ConfigService.SECRET);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

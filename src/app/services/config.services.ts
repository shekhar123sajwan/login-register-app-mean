import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public static API_URL = 'http://localhost:3000/api/';
  public static HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor() {}

  cleanUrl(url: string) {
    return url
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]/, '')
      .replace(' ', '-');
  }
}

import { SnackBar } from './../models/snackbar';
import { HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public static SECRET = 'Loginregisterapp123';
  public static API_URL = 'http://localhost:3000/api/';
  public static HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  loading: boolean = false;
  @Output() load: EventEmitter<boolean> = new EventEmitter<boolean>();

  sanckBarsubject: Subject<SnackBar> = new Subject<SnackBar>();

  constructor(private router: Router) {}

  cleanUrl(url: string) {
    return url
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]/, '')
      .replace(' ', '-');
  }

  toggleLoading(key: boolean) {
    this.loading = key;
    this.load.emit(this.loading);
  }

  redirect(path: string) {
    return this.router.navigate([path]);
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  openSnackBar(data: SnackBar) {
    return this.sanckBarsubject.next(data);
  }
}

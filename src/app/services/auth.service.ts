import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ConfigService } from './config.services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {}

  doAdminLogin(email: string, password: string): Observable<any> {
    const params = {
      email: email,
      password: password,
    };
    return this.httpService.postRequest('admin/auth', {}, params).pipe(
      map((response) => {
        return response;
      })
    );
    // return this.httpService.postRequest('admin/auth', {}, params).pipe(
    //   exhaustMap((f) => {
    //     console.log(`Emission Corrected of first interval: `);
    //     return f;
    //   }),
    //   map((response) => {
    //     return response;
    //   })
    // );
  }
}

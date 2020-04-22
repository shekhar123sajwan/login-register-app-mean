import { ConfigService } from './config.services';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { throwError, Observable, pipe } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // private httpOptions = {
  //   params: new HttpParams().set('foo', 'moo').set('limit', '25'),
  // };

  // private Option = {
  //   params: new HttpParams({ fromString: '_page=1&_limit=20' }),
  // };

  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: 'my-auth-token',
  //   }),
  //   params: new HttpParams({ fromString: '_page=1&_limit=20' }),
  // };

  //   to update headers
  //   httpOptions.headers =
  //   httpOptions.headers.set('Authorization', 'my-new-auth-token');

  constructor(private http: HttpClient) {}

  getRequest(url: string, params: Object): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(ConfigService.API_URL + this.serialize(url, params), {
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  postRequest(
    url: string,
    getParams: Object,
    postParams: any
  ): Observable<any> {
    return this.http
      .post<any>(
        ConfigService.API_URL + this.serialize(url, getParams),
        postParams,
        ConfigService.HTTP_OPTIONS
      )
      .pipe(catchError(this.handleError));
  }

  putRequest(url: string, getParams: Object, postParams: any): Observable<any> {
    return this.http
      .put<any>(
        ConfigService.API_URL + this.serialize(url, getParams),
        postParams,
        ConfigService.HTTP_OPTIONS
      )
      .pipe(catchError(this.handleError));
  }

  deleteRequest(url: string, getParams: Object): Observable<any> {
    return this.http
      .delete<any>(
        ConfigService.API_URL + this.serialize(url, getParams),
        ConfigService.HTTP_OPTIONS
      )
      .pipe(catchError(this.handleError));
  }

  serialize(url: string, params: Object) {
    let query = [];
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        query.push(key + '=' + encodeURIComponent(params[key]));
      }
    }
    return query.length ? url + '?' + query.join('&') : url;
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Server error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error Message: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class SecuredHttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request)
    const token = request.headers.get('authorization');
    const abc = request.clone({ setHeaders: this.getAPIAuthenticationHeaders(token) })
    console.log(abc)
    return next.handle(abc);
  }

  getAPIAuthenticationHeaders(token: any) {
    console.log('---', token);
    return {
      'Authorization': token,
    };
  }
}

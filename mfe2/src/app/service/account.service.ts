import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) { }

  getAccountDetailsResponse(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      'http://localhost:9638/account/view/1', { observe: 'response' });
  }
}

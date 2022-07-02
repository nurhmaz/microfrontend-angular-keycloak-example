import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) { }

  getAccountDetailsResponse() {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(
      'http://localhost:9638/account/view/1', { observe: 'response', responseType: 'text' });
  }
}

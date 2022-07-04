import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {
  baseUrl: string = 'http://localhost:9638/account';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<HttpResponse<any>> {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get<any>(
      this.baseUrl, { observe: 'response' });
  }

  getUserInfo(): Observable<HttpResponse<any>> {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get<any>(
      `${this.baseUrl}/1`, { observe: 'response' });
  }

  createUserInfo(): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.baseUrl}/1`, { observe: 'response' });
  }

  updateUserInfo(): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      `${this.baseUrl}/1`, { observe: 'response' });
  }

  deleteUserInfo(): Observable<HttpResponse<any>> {
    return this.http.delete<any>(
      `${this.baseUrl}/1`, { observe: 'response' });
  }
}

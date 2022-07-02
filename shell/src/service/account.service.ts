import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { keycloakConfigInfo } from 'src/environments/environment';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) { }

  getRptToken(): Observable<HttpResponse<any>> {
    const body = new HttpParams()
      .set('grant_type', 'urn:ietf:params:oauth:grant-type:uma-ticket')
      .set('audience', 'auth-rest');

    return this.http.post<any>(
      `${keycloakConfigInfo.url}realms/${keycloakConfigInfo.realm}/protocol/openid-connect/token`
      ,
      body.toString()
      ,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        , observe: 'response'
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakInfo } from 'src/app/model/keycloak-info';
import { AccountService } from 'src/app/service/account.service';
import { selectToken } from 'src/app/state/token.selectors';
import { keycloakConfigInfo } from 'src/environments/environment';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})

//https://github.com/mauriciovigolo/keycloak-angular/issues/203
export class UserprofileComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  keycloakInfoService$ = this.store.select(selectToken);

  constructor(private readonly keycloak: KeycloakService, private readonly store: Store, private readonly accountService: AccountService) {

  }

  public async ngOnInit() {
    this.keycloakInfoService$.subscribe((keycloakInfo) => this.initKeycloak(keycloakInfo));

    this.showAccountDetails();
  }

  async initKeycloak(keycloakInfo: KeycloakInfo) {
    console.log(keycloakInfo.token)

    await this.keycloak.init({
      config: {
        url: keycloakConfigInfo.url,
        realm: keycloakConfigInfo.realm,
        clientId: keycloakConfigInfo.clientId
      },
      initOptions: {
        token: keycloakInfo.token ?? undefined,
        refreshToken: keycloakInfo.refreshToken ?? undefined,
        idToken: keycloakInfo.idToken ?? undefined,
        pkceMethod: 'S256'
      }
    });

    this.isLoggedIn = await this.keycloak.isLoggedIn();
    this.loadProfile();
  }

  async loadProfile() {
    try {
      this.userProfile = await this.keycloak.loadUserProfile();
    } catch (e) {
      console.log(e)
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }

  public showAccountDetails() {
    this.accountService.getAccountDetailsResponse().subscribe(resp => {
      // display its headers
      const keys = resp.headers.keys();
      const headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);
      console.log("🚀 ~ file: userprofile.component.ts ~ line 73 ~ UserprofileComponent ~ this.accountService.getAccountDetailsResponse ~ headers", headers)

      console.log(resp.body)
    }, error => console.log(error))
  }
}

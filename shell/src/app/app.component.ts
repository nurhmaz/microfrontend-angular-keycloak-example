import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import jwt_decode from "jwt-decode";
import { KeycloakService } from 'keycloak-angular';
import { AccountService } from 'src/service/account.service';
import { RPTInfo } from './model/rpt-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shell';

  constructor(protected readonly store: Store,
    protected readonly keycloak: KeycloakService,
    private readonly accountService: AccountService,) {

  }

  async ngOnInit() {
    try {
      // console.log(this.keycloak)
      // const isLoggedIn = await this.keycloak.isLoggedIn();

      // if (isLoggedIn) {
      //   const token = await this.keycloak.getToken();
      //   const keycloakInstance = this.keycloak.getKeycloakInstance()
      //   const keycloakInfo = new KeycloakInfo(token, keycloakInstance.idToken, keycloakInstance.refreshToken)
      //   this.store.dispatch(update({ keycloakInfo }))
      // }
    } catch (ex) {
      console.log(ex)
    }

    // this.savePermissions();
  }

  savePermissions() {
    this.accountService.getRPT().subscribe(resp => {
      const rptTokenInfo: RPTInfo = jwt_decode(resp.body.access_token);
      localStorage.setItem('permissions', JSON.stringify(rptTokenInfo.authorization?.permissions))
    }, error => {
      console.log(error)
      localStorage.setItem('permissions', JSON.stringify([]))
    }
    )
  }
}

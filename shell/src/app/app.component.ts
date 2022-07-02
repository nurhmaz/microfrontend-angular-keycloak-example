import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { AccountService } from 'src/service/account.service';
import { KeycloakInfo } from './model/keycloak-info';
import { update } from './state/token.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shell';

  constructor(protected readonly store: Store,
    protected readonly keycloak: KeycloakService,
    private readonly accountService: AccountService) {
    //
  }
  async ngOnInit() {
    const token = await this.keycloak.getToken();
    const keycloakInstance = this.keycloak.getKeycloakInstance()
    const keycloakInfo = new KeycloakInfo(token, keycloakInstance.idToken, keycloakInstance.refreshToken)
    this.store.dispatch(update({ keycloakInfo }))
    this.savePermissions();
  }

  savePermissions() {
    this.accountService.getRptToken().subscribe(resp => {
      console.log(`RPT Token: ${resp.body.access_token}`)
    }, error => console.log(error)
    )
  }
}

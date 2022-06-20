import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakInfo } from './model/keycloak-info';
import { update } from './state/token.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(protected readonly store: Store,
    protected readonly keycloak: KeycloakService,) {
    //
  }
  async ngOnInit() {
    const token = await this.keycloak.getToken();
    const keycloakInstance = this.keycloak.getKeycloakInstance()
    const keycloakInfo = new KeycloakInfo(token, keycloakInstance.idToken, keycloakInstance.refreshToken)
    this.store.dispatch(update({ keycloakInfo }))
  }

}

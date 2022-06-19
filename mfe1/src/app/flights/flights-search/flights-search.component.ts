import { Component, ViewChild, ViewContainerRef, Inject, Injector, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakInfo } from 'src/app/model/keycloak-info';
import { selectToken } from 'src/app/state/token.selectors';
import { keycloakConfigInfo } from 'src/environments/environment';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html'
})
export class FlightsSearchComponent implements OnInit {

  @ViewChild('vc', { read: ViewContainerRef, static: true })
  viewContainer: ViewContainerRef;

  isLoggedIn = false;
  keycloakInfoService$ = this.store.select(selectToken);

  constructor(
    @Inject(Injector) private injector,
    @Inject(ComponentFactoryResolver) private cfr,
    private readonly keycloak: KeycloakService,
    private store: Store) { }


  public async ngOnInit() {
    this.keycloakInfoService$.subscribe((keycloakInfo) => this.initKeycloak(keycloakInfo));
  }

  async initKeycloak(keycloakInfo: KeycloakInfo) {
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
  }

  search(): void {
    alert('Not implemented for this demo!');
  }

  terms(): void {
    import('../lazy/lazy.component')
      .then(m => m.LazyComponent)
      .then(comp => {
        const factory = this.cfr.resolveComponentFactory(comp);
        this.viewContainer.createComponent(factory, null, this.injector);
      });

  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}

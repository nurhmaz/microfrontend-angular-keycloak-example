import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { StoreModule } from '@ngrx/store';
import { AccountService } from 'src/service/account.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { keycloakInfoReducer } from './state/token.reducer';

function initializeKeycloak(keycloak: KeycloakService) {
  const realm = localStorage.getItem('realm')
  const clientId = localStorage.getItem('clientId')

  if (!realm && !clientId) {
    return () => { };
  } else {
    return () =>
      keycloak.init({
        config: {
          url: 'http://127.0.0.1:8180/',
          realm: realm!,
          clientId: clientId!
        },
        initOptions: {
          onLoad: 'login-required',
          pkceMethod: 'S256',
        }
      });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    KeycloakAngularModule,
    StoreModule.forRoot({ keycloakInfoService: keycloakInfoReducer })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    AccountService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

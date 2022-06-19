import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { KeycloakAngularModule } from 'keycloak-angular';
import { keycloakInfoReducer } from '../state/token.reducer';
import { FlightsSearchComponent } from './flights-search/flights-search.component';
import { FLIGHTS_ROUTES } from './flights.routes';

@NgModule({
  imports: [
    CommonModule,
    KeycloakAngularModule,
    RouterModule.forChild(FLIGHTS_ROUTES),
    StoreModule.forFeature('keycloakInfoService', keycloakInfoReducer)
  ],
  declarations: [
    FlightsSearchComponent
  ],
})
export class FlightsModule { }

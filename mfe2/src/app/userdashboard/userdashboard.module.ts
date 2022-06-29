import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { KeycloakAngularModule } from 'keycloak-angular';
import { AuthGuard } from '../authguard';
import { keycloakInfoReducer } from '../state/token.reducer';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountService } from '../service/account.service';

const USER_DASHBOARD_ROUTES: Routes = [
  {
    path: 'user-profile',
    component: UserprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    UserprofileComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(USER_DASHBOARD_ROUTES),
    KeycloakAngularModule,
    StoreModule.forFeature('keycloakInfoService', keycloakInfoReducer)
  ],
  providers: [
    AccountService
  ]
})
export class UserdashboardModule { }

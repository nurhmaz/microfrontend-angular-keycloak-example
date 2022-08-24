import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { selectToken } from '../state/token.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = true;
  keycloakInfoService$ = this.store.select(selectToken);

  constructor(private router: Router,
    protected readonly keycloak: KeycloakService,
    private readonly store: Store) {

  }

  ngOnInit() {
    console.log('home')
    this.keycloakInfoService$.subscribe((keycloakInfo) => {
      console.log(keycloakInfo)
      if (!keycloakInfo.token) {
        this.isLoggedIn = false;
      }
    });

    const realm = localStorage.getItem('realm')
    const clientId = localStorage.getItem('clientId')

    // this.router.navigate(['/user/user-profile']);
  }

  saveDataAndReload(realm: string, clientId: string) {
    localStorage.setItem('realm', realm)
    localStorage.setItem('clientId', clientId)

    window.location.reload()
  }
}

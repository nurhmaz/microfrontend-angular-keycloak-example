import { Routes } from '@angular/router';
import { AuthGuard } from '../authguard';
import { FlightsSearchComponent } from './flights-search/flights-search.component';

export const FLIGHTS_ROUTES: Routes = [
    {
      path: 'flights-search',
      component: FlightsSearchComponent,
      canActivate: [AuthGuard]
    }
];

import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authguard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   loadChildren: () => loadRemoteModule({
  //     type: 'module',
  //     remoteEntry: 'http://localhost:3000/remoteEntry.js',
  //     exposedModule: './FlightsModule'
  //   }).then(m => m.FlightsModule)
  // },
  {
    path: 'user',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:3200/remoteEntry.js',
      exposedModule: './UserdashboardModule'
    }).then(m => m.UserdashboardModule)
  },


  // Your route here:

  {
    path: 'flights',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:3000/remoteEntry.js',
      exposedModule: './FlightsModule'
    }).then(m => m.FlightsModule),
    // canActivate: [AuthGuard]
  },

  {
    path: '**',
    component: NotFoundComponent
  }

  // DO NOT insert routes after this one.
  // { path:'**', ...} needs to be the LAST one.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

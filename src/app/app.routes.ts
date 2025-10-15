import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'administration',
    pathMatch: 'full',
  },
  {
    path: 'administration',
    loadChildren: () => import('./modules/administration/administration.routes').then(r => r.routes),
  },
];

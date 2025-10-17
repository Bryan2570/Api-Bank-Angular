import {Routes} from "@angular/router";
import {MainComponent} from "./page/main/main.component";

export const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: '',
      redirectTo: 'clients',
      pathMatch: 'full',
    },
    {
      path: 'clients',
      loadComponent: () => import('../clients/page/clients/clients.component').then(c => c.ClientsComponent),
      data: { title: 'Clientes' }
    },
    {
      path: 'accounts',
      loadComponent: () => import('../accounts/page/accounts/accounts.component').then(c => c.AccountsComponent),
      data: { title: 'Cuentas' }
    },
    {
      path: 'movements',
      loadComponent: () => import('../movements/page/movements/movements.component').then(c => c.MovementsComponent),
      data: { title: 'Movimientos' }
    },
    {
      path: 'reports',
      loadComponent: () => import('../reports/page/reports/reports.component').then(c => c.ReportsComponent),
      data: { title: 'Reportes' }
    }
  ]
},]

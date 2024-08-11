import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/cliente-shell/cliente-shell.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

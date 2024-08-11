import { Routes } from '@angular/router';

export default [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../dashboard-cliente/dashboard-cliente.component'),
      },
      {
        path: 'crear',
        loadComponent: () =>
          import('../crear-cliente/crear-cliente.component'),
      },
      {
        path: 'edit/:clienteId',
        loadComponent: () =>
          import('../crear-cliente/crear-cliente.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
] as Routes;

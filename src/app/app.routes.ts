import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { unitsDetailResolver } from './routes/units-detail/units-detail.resolver';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./routes/home/home.component'),
      },
      {
        path: 'units',
        children: [
          {
            path: '',
            title: 'Units',
            loadComponent: () => import('./routes/units/units.component'),
          },
          {
            path: 'detail/:id',
            title: 'Detail',
            resolve: {
              unit: unitsDetailResolver,
            },
            loadComponent: () =>
              import('./routes/units-detail/units-detail.component'),
          },
          { path: '', redirectTo: '', pathMatch: 'full' },
          { path: '**', redirectTo: '', pathMatch: 'full' },
        ],
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

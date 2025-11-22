import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'usuario',
        loadComponent: () =>
          import('../pages/usuario/usuario.page').then(m => m.UsuarioPage)
      },
      {
        path: 'movie-details/:id',
        loadComponent: () =>
          import('../pages/movie-details/movie-details.page').then(m => m.MovieDetailsPage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ],
  }
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'movie-details/:id',
        loadComponent: () => import('../pages/movie-details/movie-details.page').then(m => m.MovieDetailsPage)
      }

    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];
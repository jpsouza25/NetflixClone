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
        path: 'games',
        loadComponent: () => import('../pages/games/games.page').then(m => m.GamesPage)
      },
      {
        path: 'news',
        loadComponent: () => import('../pages/news/news.page').then(m => m.NewsPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('../pages/profile/profile.page').then(m => m.ProfilePage)
      },

    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];
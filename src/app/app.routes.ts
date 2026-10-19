import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro-guard';
import { AutoLoginGuard } from './guards/auto-login-guard';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    canMatch: [IntroGuard, AutoLoginGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canMatch: [AuthGuard]
  },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro/intro.page').then(m => m.IntroPage)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },



];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', // Página inicial
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'services', // Página de serviços
    loadComponent: () =>
      import('./pages/services/services').then(m => m.Services),
  },
  {
    path: 'gallery', // Página da galeria
    loadComponent: () =>
      import('./pages/gallery/gallery').then(m => m.Gallery),
  },
  {
    path: 'booking', // Página do formulário
    loadComponent: () =>
      import('./pages/booking/booking').then(m => m.Booking),
  },
  {
    path: '**', // Qualquer rota inválida redireciona para a Home
    redirectTo: '',
  },
];

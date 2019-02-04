/**
 * Archivo para las rutas de la aplicacion
 */
import { IndexComponent } from './index/index.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes

const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: '**', component: IndexComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

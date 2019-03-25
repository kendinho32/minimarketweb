/**
 * Archivo para las rutas de la aplicacion
 */
import { IndexComponent } from './index/index.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { ProductosComponent } from './productos/productos.component';
import { EditproductsComponent } from './editproducts/editproducts.component';
import { MiscomprasComponent } from './miscompras/miscompras.component';
import { CreatesliderComponent } from './createslider/createslider.component';
import { GetslidersComponent } from './getsliders/getsliders.component';

// Componentes

const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'home/:id', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'edit-producto/:id', component: EditproductsComponent },
  { path: 'mis-compras', component: MiscomprasComponent },
  { path: 'slider', component: GetslidersComponent },
  { path: 'create-slider', component: CreatesliderComponent },
  { path: '**', component: IndexComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

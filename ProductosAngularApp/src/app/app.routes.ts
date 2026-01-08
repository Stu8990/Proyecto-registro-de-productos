import { Routes } from '@angular/router';
import { TipoProductoList } from './components/tipo-producto-list/tipo-producto-list';
import { ProductoList } from './components/producto-list/producto-list';

export const routes: Routes = [
  { path: '', redirectTo: '/tipos-producto', pathMatch: 'full' },
  { path: 'tipos-producto', component: TipoProductoList },
  { path: 'productos', component: ProductoList }
];

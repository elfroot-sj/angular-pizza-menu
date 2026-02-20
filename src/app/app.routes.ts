import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Products } from './products/products';

export const routes: Routes = [
  { path: '', component: Home }, // imposto la home come default route
  { path: 'home', component: Home },
  { path: 'products', component: Products },
];

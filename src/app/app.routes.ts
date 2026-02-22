import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Products } from './features/products/products';
import { Cart } from './features/cart/cart';
import { ProductDetail } from './features/product-detail/product-detail';


export const routes: Routes = [
  { path: '', component: Home }, // imposto la home come default route
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'pizzas/:id', component: ProductDetail },
  { path: 'cart', component: Cart },
];

import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Products } from './features/products/products';
import { Cart } from './features/cart/cart';
import { ProductDetail } from './features/product-detail/product-detail';
import { PageNotFound } from './features/page-not-found/page-not-found';


export const routes: Routes = [
  { path: '', component: Home }, // imposto la home come default route
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'pizzas/:id', component: ProductDetail },
  { path: 'cart', component: Cart },
  { path: 'not-found', component: PageNotFound}, // route per la pagina di errore 404
  { path: '**', component: PageNotFound }, // fallback route per errori di navigazione, deve sempre essere l'ultima route definita; è una wildcard: se nessuna route sopra ha fatto match -> PageNotFound
];

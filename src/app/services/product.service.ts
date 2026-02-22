import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pizza } from '../models/pizza.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  private apiUrl = 'https://my-json-server.typicode.com/zoelounge/menupizza/cards';

  // GET tutte le pizze
  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl); // subscribe in products.ts
  }

  //DELETE una pizza per id
  deletePizza(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}

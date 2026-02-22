import { Injectable, signal, computed } from '@angular/core';
import { Pizza } from '../models/pizza.model';
// gestisco stato globale carrello (con signals)


export interface CartItem extends Pizza {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = signal<CartItem[]>([]);

  cartItems = this.items.asReadonly(); // versione readonly del signal per evitare modifiche esterne al servizio (nessun componente può modificare direttamente items, ma solo tramite i metodi addPizza, removePizza, clearCart)

  total = computed(() => this.items().reduce((acc, item) => acc + item.price * item.quantity, 0)); //ogni volta che items() cambia, total viene ricalcolato automaticamente, garantendo che il totale sia sempre aggiornato con lo stato corrente del carrello

  addPizza(pizza: Pizza) {
    this.items.update((items) => {
      const existing = items.find((p) => p.id === pizza.id);

      if (existing) {
        existing.quantity++;
        return [...items]; // trigger per change detection -> spread operator per immutabilità
      }

      return [...items, { ...pizza, quantity: 1 }];
    });
  }

  removePizza(pizza: Pizza) {
    this.items.update((items) => {
      const existing = items.find((p) => p.id === pizza.id);

      if (!existing) return items;

      if (existing.quantity === 1) {
        return items.filter((p) => p.id !== pizza.id);
      }

      existing.quantity--;
      return [...items];
    });
  }

  clearCart() {
    this.items.set([]);
  }
}

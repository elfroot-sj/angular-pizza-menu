import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Pizza } from '../../models/pizza.model';
import { ProductCard } from './product-card';



@Component({
  selector: 'app-products',
  imports: [ProductCard],
  template: `
    <div class="container mt-4">
      <div class="row">
        @for (pizza of pizzas(); track pizza.id) {
          <div class="col-md-4 mb-4">
            <app-product-card
              [pizza]="pizza"
              [quantity]="getQuantity(pizza.id)"
              (add)="addPizza($event)"
              (remove)="removePizza($event)"
              (delete)="deletePizza($event)"
            >
            </app-product-card>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush, // Angular non controlla più continuamente i cambiamenti di stato, ma solo quando riceve nuovi input, cambia un evento, o quando si verifica un evento asincrono (es. HTTP)
  styles: ``,
})
export class Products implements OnInit {
  pizzas = signal<Pizza[]>([]);

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.productService.getPizzas().subscribe((data) => {
      this.pizzas.set(data);
    });
  }

  addPizza(pizza: Pizza) {
    this.cartService.addPizza(pizza);
  }

  removePizza(pizza: Pizza) {
    this.cartService.removePizza(pizza);
  }

  getQuantity(pizzaId: number): number {
    const item = this.cartService.cartItems().find((p) => p.id === pizzaId);

    return item ? item.quantity : 0;
  }

  deletePizza(id: number) {
    this.productService.deletePizza(id).subscribe(() => {
      this.pizzas.update((pizzas) => pizzas.filter((p) => p.id !== id));
    });
  }
}

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mt-4">
      <h2>Cart</h2>

      @if (cartItems().length === 0) {
        <p>Your cart is empty.</p>
      } @else {
        <ul class="list-group mb-3">
          @for (item of cartItems(); track item.id) {
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{{ item.name }}</strong>
                <div>{{ item.quantity }} × {{ item.price }} €</div>
              </div>

              <span> {{ item.quantity * item.price }} € </span>
            </li>
          }
        </ul>

        <h4>Total: {{ total() }} €</h4>

        <button class="btn btn-success mt-3" (click)="checkout()">Purchase</button>
      }
    </div>
  `,
})
export class Cart {
  private cartService = inject(CartService);
  private router = inject(Router);

  cartItems = this.cartService.cartItems;
  total = this.cartService.total;

  checkout() {
    alert('Thank you for your purchase! 🍕');

    this.cartService.clearCart();
    this.router.navigate(['/home']);
  }
}

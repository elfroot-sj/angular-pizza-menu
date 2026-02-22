import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-product-detail',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (pizza()) {
      <div class="container mt-4">
        <div class="card p-4 shadow w-75 mx-auto">
          <img [src]="pizza()!.image" class="img-fluid mb-3" />

          <h2>{{ pizza()!.name }}</h2>

          <p>{{ pizza()!.description }}</p>

          <h4>{{ pizza()!.price }} €</h4>
        </div>
      </div>
    } @else {
      <p class="text-center mt-5">Loading...</p>
    }
  `,
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  pizza = signal<Pizza | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getPizzas().subscribe((data) => {
      const found = data.find((p) => p.id === id);
      this.pizza.set(found ?? null);
    });
  }
}

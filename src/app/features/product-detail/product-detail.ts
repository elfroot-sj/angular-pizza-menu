import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-product-detail',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <p class="text-center mt-5">Loading...</p>
    }
    @if (!loading() && notFound()) {
      <div class="alert alert-danger text-center mt-5">Pizza not found.</div>
    }
    @if (!loading() && pizza()) {
      <div class="container mt-4">
        <div class="card p-4 shadow w-75 mx-auto">
          <img [src]="pizza()!.image" class="img-fluid mb-3" />

          <h2>{{ pizza()!.name }}</h2>

          <p>{{ pizza()!.description }}</p>

          <h4>{{ pizza()!.price }} €</h4>
        </div>
      </div>
    }
  `,
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  pizza = signal<Pizza | null>(null);
  loading = signal(true);
  notFound = signal(false);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // ottengo l'id dalla route

    this.productService.getPizzas().subscribe({
      next: (data) => {
        const found = data.find((p) => p.id === id);

        if (found) {
          this.pizza.set(found);
        } else {
          this.notFound.set(true);
        }

        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.notFound.set(true);
      },
    });
  }
}

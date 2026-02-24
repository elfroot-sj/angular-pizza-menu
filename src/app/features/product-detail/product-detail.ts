import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
    }
  `,
  styles: ``,
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  pizza = signal<Pizza | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // ottengo l'id dalla route

    this.productService.getPizzas().subscribe({
      next: (data) => {
        const found = data.find((p) => p.id === id);

        if (!found) {
          this.router.navigate(['/not-found']);
          return;
        }

        this.pizza.set(found);
      },
      error: () => {
        this.router.navigate(['/not-found']);
      },
    });
  }
}

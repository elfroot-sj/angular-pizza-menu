import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card h-100 shadow-sm">
      <img
        [src]="pizza.image"
        class="card-img-top"
        [alt]="pizza.name"
        [routerLink]="['/pizzas', pizza.id]"
        style="cursor: pointer;"
      />

      <div class="card-body d-flex flex-column">
        <h5 class="card-title" [routerLink]="['/pizzas', pizza.id]" style="cursor: pointer;">
          {{ pizza.name }}
        </h5>

        <p class="card-text mb-2">{{ pizza.price }} €</p>

        <div class="mt-auto d-flex justify-content-between align-items-center">
          <button
            class="btn btn-sm"
            [class]="quantity === 0 ? 'btn-secondary' : 'btn-outline-danger'"
            (click)="onRemove()"
            [disabled]="quantity === 0"
          >
            −
          </button>
          <span class="fw-bold">
            {{ quantity }}
          </span>
          <button class="btn btn-outline-success btn-sm" (click)="onAdd()">+</button>
        </div>
        <button class="btn btn-outline-dark btn-sm mt-3 btn-delete" (click)="onDelete()">
          Delete
        </button>
      </div>
    </div>
  `,
  styles: `
    .btn-delete {
      border-color: #dc3545;
      color: #dc3545;
    }

    .btn-delete:hover {
      background-color: #dc3545;
      color: white;
    }

    button:disabled {
      pointer-events: auto;
      cursor: not-allowed;
      opacity: 0.65;
    }
  `,
})
export class ProductCard {
  @Input({ required: true }) pizza!: Pizza; // input obbligatorio, il componente genitore deve sempre fornire un oggetto pizza valido nel template; ! indica a TypeScript che questa proprietà sarà sicuramente inizializzata prima dell'uso con binding, anche se non viene assegnato un valore di default
  @Input() quantity: number = 0; // se il parent non fornisce un valore, di default è 0

  // questo componente figlio espone eventi personalizzati (add, remove, delete) al componente genitore Products (che li  intercetta nel template)
  @Output() add = new EventEmitter<Pizza>();
  @Output() remove = new EventEmitter<Pizza>();
  @Output() delete = new EventEmitter<number>();

  onAdd() {
    this.add.emit(this.pizza); // emetto l'intero oggetto pizza ($event), così il componente genitore ha tutte le informazioni necessarie per gestire l'aggiunta al carrello
  }

  onRemove() {
    this.remove.emit(this.pizza);
  }

  onDelete() {
    this.delete.emit(this.pizza.id);
  }
}

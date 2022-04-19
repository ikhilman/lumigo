import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent {

  @Input() products: Product[] | null = [];

  @Output() removeClicked!: EventEmitter<Product>;


  constructor() {
    this.removeClicked = new EventEmitter<Product>();
  }

  removeItem(product: Product) {
    this.removeClicked.emit(product)
  }
}

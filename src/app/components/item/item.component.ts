import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit, OnDestroy {

  @Input() product!: Product;

  @Output() quantitySelected!: EventEmitter<Product>

  quantityControl!: FormControl;
  valueChangesSubscription!: Subscription;

  constructor(
    private fb: FormBuilder
  ) {
    this.quantityControl = this.fb.control('');
    this.quantitySelected = new EventEmitter<Product>();
  }

  ngOnInit(): void {
    this.valueChangesSubscription = this.quantityControl.valueChanges
      .pipe(
        tap(quantity => {
          const productClone = { ...this.product };
          productClone.quantity = quantity;
          this.quantitySelected.emit(productClone)
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription?.unsubscribe();
  }
}

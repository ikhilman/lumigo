import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFilter } from 'src/app/models/filter.model';
import { Product } from 'src/app/models/product.model';
import { HomePageQuery } from 'src/app/store/home-page/home-page.query';
import { HomeFacade } from './home.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  priceFilters: ProductFilter[] = [
    {
      filter: '<100',
      checked: true
    },
    {
      filter: '>200',
      checked: false
    }
  ];

  ratingFilters: ProductFilter[] = [
    {
      filter: '1',
      checked: true
    },
    {
      filter: '2',
      checked: false
    },
    {
      filter: '3',
      checked: false
    },
    {
      filter: '4',
      checked: false
    }
  ]

  products$!: Observable<Product[]>;
  shoppingCart$!: Observable<Product[]>;

  constructor(
    private homeFacade: HomeFacade,
    private homeQuery: HomePageQuery
  ) { }

  ngOnInit(): void {
    this.homeFacade.getAllProducts();
    this.priceFilterChange(this.priceFilters.filter(p => p.checked))
    this.ratingFilterChange(this.ratingFilters.filter(p => p.checked))
    this.products$ = this.homeQuery.selectFilteredProducts$;
    this.shoppingCart$ = this.homeQuery.selectShoppingCart$;
    this.homeFacade.setShoppingCartFromStorage();
  }

  priceFilterChange(filters: ProductFilter[]) {
    this.homeFacade.setPriceFiltersToStore(filters);
  }

  ratingFilterChange(filters: ProductFilter[]) {
    this.homeFacade.setRatingFiltersToStore(filters);
  }

  quantitySelected(product: Product) {
    this.homeFacade.addProductToShoppingCart(product)
  }

  removeClicked(product: Product) {
    this.homeFacade.removeClicked(product)
  }

  textInput(text: string) {
    this.homeFacade.updateText(text);
  }
}

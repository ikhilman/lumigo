import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { combineLatest, map } from 'rxjs';
import { ProductFilter } from 'src/app/models/filter.model';
import { IKeyValue } from 'src/app/models/iKeyValue.model';
import { Product } from 'src/app/models/product.model';
import { HomePageState, HomePageStore } from './home-page.store';

@Injectable({ providedIn: 'root' })
export class HomePageQuery extends Query<HomePageState> {

    selectProducts$ = this.select(store => store.products);
    selectPriceFilter$ = this.select(store => store.priceFilters);
    selecRatingFilter$ = this.select(store => store.ratingFilters);
    selectShoppingCart$ = this.select(store => store.shoppingCart);
    selectSearchText$ = this.select(store => store.searchText);
    selectFilteredProducts$ = combineLatest([this.selectProducts$, this.selectPriceFilter$, this.selecRatingFilter$, this.selectSearchText$])
        .pipe(
            map(([products, pricefilter, ratingFilter,text]) => {
                const productsByPricee = this.filterByPrice(products, pricefilter);
                const productsByRating = this.filterByRating(products, ratingFilter);
                let productsToReturn = [...new Set([...productsByPricee, ...productsByRating])]
                if(text){
                    productsToReturn = productsToReturn.filter(p=>p.title.toLowerCase().startsWith(text));
                }
                return productsToReturn;
            })
        )

    constructor(protected override store: HomePageStore) {
        super(store);
    }

    private filterByPrice(products: Product[], filters: ProductFilter[]): Product[] {
        let productsToReturn: IKeyValue<Product> = {};
        filters.forEach(priceFilter => {
            products.forEach(product => {
                switch (priceFilter.filter) {
                    case '<100':
                        if (!productsToReturn[product.id] && product.price < 100) {
                            productsToReturn[product.id] = { ...product };
                        }
                        break;
                    case '>200':
                        if (!productsToReturn[product.id] && product.price > 200) {
                            productsToReturn[product.id] = { ...product };
                        }
                        break;
                    default:
                        break;
                }
            })
        })

        return Object.values(productsToReturn);
    }

    private filterByRating(products: Product[], filters: ProductFilter[]): Product[] {
        let productsToReturn: IKeyValue<Product> = {};
        products.forEach(product => {
            if (!productsToReturn[product.id] && filters.filter(f => f.filter === product.rating.rate.toString()).length) {
                productsToReturn[product.id] = { ...product };
            }
        })
        return Object.values(productsToReturn);
    }


}
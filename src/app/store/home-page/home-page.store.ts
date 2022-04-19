import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { CacheKeys } from 'src/app/models/cacheKeys.enum';
import { ProductFilter } from 'src/app/models/filter.model';
import { Product } from 'src/app/models/product.model';

export interface HomePageState {
    priceFilters: ProductFilter[];
    ratingFilters: ProductFilter[];
    products: Product[];
    shoppingCart: Product[];
    searchText: string;
}



export function createInitialState(): HomePageState {
    return {
        priceFilters: [],
        ratingFilters: [],
        products: [],
        shoppingCart: [],
        searchText: ''
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'home-page' })
export class HomePageStore extends Store<HomePageState> {

    constructor() {
        super(createInitialState());
    }
}
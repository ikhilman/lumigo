import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { CacheKeys } from "src/app/models/cacheKeys.enum";
import { ProductFilter } from "src/app/models/filter.model";
import { Product } from "src/app/models/product.model";
import { ProductsService } from "src/app/services/products.service";
import { HomePageStore } from "src/app/store/home-page/home-page.store";


@Injectable({ providedIn: 'root' })
export class HomeFacade {



    constructor(
        private homeStore: HomePageStore,
        private productsService: ProductsService
    ) { }

    setPriceFiltersToStore(filters: ProductFilter[]) {
        this.homeStore.update(store => {
            return {
                ...store,
                priceFilters: filters
            }
        })
    }

    setRatingFiltersToStore(filters: ProductFilter[]) {
        this.homeStore.update(store => {
            return {
                ...store,
                ratingFilters: filters
            }
        })
    }

    getAllProducts() {
        this.productsService.getAllProducts()
            .pipe(
                tap(products => this.homeStore
                    .update(store => {
                        return {
                            ...store,
                            products
                        }
                    })
                )
            ).subscribe()

    }

    addProductToShoppingCart(product: Product) {
        this.homeStore.update(store => {
            const productInShoppingCartIndex = store.shoppingCart.findIndex(p => p.id === product.id);
            if (productInShoppingCartIndex > -1) {
                store.shoppingCart[productInShoppingCartIndex].quantity = product.quantity;
                localStorage.setItem(CacheKeys.ShoppingCart, JSON.stringify(store.shoppingCart))
                return {
                    ...store,
                    shoppingCart: [...store.shoppingCart]
                }
            }
            localStorage.setItem(CacheKeys.ShoppingCart, JSON.stringify([...store.shoppingCart, product]))
            return {
                ...store,
                shoppingCart: [...store.shoppingCart, product]
            }
        })
    }

    removeClicked(product: Product) {
        this.homeStore.update(store => {
            const productInShoppingCartIndex = store.shoppingCart.findIndex(p => p.id === product.id);
            const shoppingCartClone = [...store.shoppingCart];
            shoppingCartClone.splice(productInShoppingCartIndex, 1);
            localStorage.setItem(CacheKeys.ShoppingCart, JSON.stringify(shoppingCartClone))
            return {
                ...store,
                shoppingCart: shoppingCartClone
            }
        })
    }

    setShoppingCartFromStorage() {
        const storage = localStorage.getItem(CacheKeys.ShoppingCart);
        storage && this.homeStore.update(store => {
            return {
                ...store,
                shoppingCart: JSON.parse(storage)

            }
        })

    }

    updateText(text: string) {
        this.homeStore.update(store => {
            return {
                ...store,
                searchText: text
            }
        })
    }
}
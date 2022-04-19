import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FilterModule } from 'src/app/components/filter/filter.module';
import { ItemModule } from 'src/app/components/item/item.module';
import { ShoppingCartModule } from 'src/app/components/shopping-cart/shopping-cart.module';
import { TextInputModule } from 'src/app/components/text-input/text-input.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FilterModule,
    ItemModule,
    ShoppingCartModule,
    TextInputModule,
    NgxSkeletonLoaderModule
  ]
})
export class HomeModule { }

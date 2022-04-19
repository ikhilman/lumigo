import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { MatCardModule } from '@angular/material/card';
import { RatingModule } from 'ng-starrating';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RatingModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    ItemComponent
  ]
})
export class ItemModule { }

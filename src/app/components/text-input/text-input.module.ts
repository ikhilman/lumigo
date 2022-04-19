import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input.component';
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TextInputComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    TextInputComponent
  ]
})
export class TextInputModule { }

import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent implements OnInit, OnDestroy {

  @Output() textInput!: EventEmitter<string>;

  textFormControl!: FormControl
  valueChangesSubscription!: Subscription;

  constructor(private fb: FormBuilder) {
    this.textFormControl = this.fb.control('');
    this.textInput = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.subscribeToValueChanges();
  }

  subscribeToValueChanges() {
    this.valueChangesSubscription = this.textFormControl
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(value => this.textInput.emit(value))
      ).subscribe()
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription?.unsubscribe();
  }
}

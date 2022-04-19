import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { ProductFilter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit, OnDestroy {


  @Input() filters!: ProductFilter[];
  @Input() title!: string;

  @Output() filterChanged!: EventEmitter<ProductFilter[]>;

  valueChangesSubscription!: Subscription;

  labelPosition: 'before' | 'after' = 'after';

  filterFormGroup!: FormGroup;

  get formArray() {
    return this.filterFormGroup.controls['filters'] as FormArray;
  }

  public asFormControl = (formControl: AbstractControl): FormControl =>
    formControl as FormControl;

  constructor(
    private fb: FormBuilder
  ) {
    this.filterChanged = new EventEmitter<ProductFilter[]>()
  }

  ngOnInit(): void {
    this.setFiltersFormArray();
    this.subscribeToValueChanges();
  }

  subscribeToValueChanges() {
    this.valueChangesSubscription = this.filterFormGroup.controls['filters'].valueChanges
      .pipe(
        tap((formValues: boolean[]) => {
          const checkedFilters: ProductFilter[] = [];

          formValues.forEach((value: boolean, index: number) => {
            value && checkedFilters.push(this.filters[index]);
          })
          this.filterChanged.emit(checkedFilters);
        })
      ).subscribe();
  }

  setFiltersFormArray() {
    this.filterFormGroup = this.fb.group({
      filters: this.fb.array([])
    })

    this.filters.forEach(item => {
      (this.filterFormGroup.controls['filters'] as FormArray).push(this.fb.control(item.checked));
    })
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription?.unsubscribe();
  }

}

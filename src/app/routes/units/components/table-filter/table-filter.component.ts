import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UnitsStore } from '../../units.store';
import { AGES, COSTS } from './constants';
import { Filter } from '../../units.model';
import { UnitsForm } from './table-filter.model';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatCheckboxModule,
  ],
})
export default class TableFilterComponent implements OnInit {
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #store = inject(UnitsStore);
  readonly fb: FormBuilder = inject(FormBuilder);
  public form!: FormGroup;
  public ages = AGES;

  get costsFormArray() {
    return this.form.controls['costs'] as FormArray;
  }

  ngOnInit(): void {
    this.form = this.fb.group<UnitsForm>({
      age: this.fb.nonNullable.control(''),
      costs: this.fb.array(
        COSTS.map(({ name, checked, min, max }) =>
          this.fb.group({
            name: this.fb.nonNullable.control(name),
            checked: this.fb.nonNullable.control(checked),
            min: this.fb.nonNullable.control(min),
            max: this.fb.nonNullable.control(max),
          }),
        ),
      ),
    });

    this.form.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.#destroyRef))
      .subscribe(({ age, costs }: Filter) => {
        const filter = {
          age,
          costs: costs
            .filter(({ checked }) => checked)
            .map(({ name, min, max }) => ({ name, min, max })),
        };
        this.#store.getUnitsByFilter(filter);
      });
  }

  getCostFormGroup(index: number): FormGroup {
    return this.costsFormArray.at(index) as FormGroup;
  }
}

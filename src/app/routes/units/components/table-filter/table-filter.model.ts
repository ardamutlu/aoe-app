import { FormArray, FormControl, FormGroup } from '@angular/forms';

interface CostForm {
  name: FormControl<string>;
  checked: FormControl<boolean>;
  min: FormControl<number>;
  max: FormControl<number>;
}

export interface UnitsForm {
  age: FormControl<string>;
  costs: FormArray<FormGroup<CostForm>>;
}

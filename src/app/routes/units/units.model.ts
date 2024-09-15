import { Age, Cost } from '@models/units.model';

export interface FilterCost {
  name: Cost;
  min: number;
  max: number;
  checked?: boolean;
}

export interface Filter {
  age: Age | null;
  costs: FilterCost[];
}

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Unit } from '@models/units.model';
import { UnitsService } from '../units/units.service';

export const unitsDetailResolver: ResolveFn<Unit | null> = (
  route: ActivatedRouteSnapshot,
) => {
  const id: string = route.paramMap.get('id') || '';
  const unitsService = inject(UnitsService);
  return unitsService.getUnitById(id);
};

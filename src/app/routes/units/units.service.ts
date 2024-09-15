import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Unit } from '@models/units.model';
import { UnitsRepository } from '@services/units.repository';
import { Filter } from './units.model';
import { filterUnits } from './utils';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  readonly #unitsService = inject(UnitsRepository);

  getUnits(): Observable<Unit[]> {
    return this.#unitsService.getUnits();
  }

  getUnitById(id: string): Observable<Unit | null> {
    return this.#unitsService
      .getUnits()
      .pipe(map((units) => units.find((d) => String(d.id) === id) || null));
  }

  getUnitsByFilter(filter: Filter): Observable<Unit[]> {
    return this.#unitsService
      .getUnits()
      .pipe(map((units) => filterUnits(units, filter)));
  }
}

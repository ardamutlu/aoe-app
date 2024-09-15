import { inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { UnitsService } from './units.service';
import { Unit } from '@models/units.model';
import { Filter } from './units.model';

interface UnitsState {
  data: Unit[];
  isLoading: boolean;
  filter: Filter;
}

const initialState: UnitsState = {
  data: [],
  isLoading: false,
  filter: {
    age: null,
    costs: [],
  },
};

export const UnitsStore = signalStore(
  withState(initialState),
  withMethods((store, unitsService = inject(UnitsService)) => {
    const updateFilter = (filter: UnitsState['filter']): void => {
      patchState(store, (state) => ({
        filter: { ...state.filter, ...filter },
      }));
    };

    const updateLoading = (isLoading: UnitsState['isLoading']): void => {
      patchState(store, { isLoading });
    };

    return {
      updateFilter,
      updateLoading,
      getUnits: rxMethod<void>(
        pipe(
          tap(() => updateFilter(initialState.filter)),
          tap(() => updateLoading(true)),
          switchMap(() => {
            return unitsService.getUnits().pipe(
              tapResponse({
                next: (data) => patchState(store, { data }),
                error: console.error,
                finalize: () => updateLoading(false),
              }),
            );
          }),
        ),
      ),
      getUnitsByFilter: rxMethod<Filter>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap((filter) => updateFilter(filter)),
          tap(() => updateLoading(true)),
          switchMap((filter) => {
            return unitsService.getUnitsByFilter(filter).pipe(
              tapResponse({
                next: (data) => patchState(store, { data }),
                error: console.error,
                finalize: () => updateLoading(false),
              }),
            );
          }),
        ),
      ),
    };
  }),
);

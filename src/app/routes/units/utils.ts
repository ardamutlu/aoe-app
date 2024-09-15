import { Unit } from '@models/units.model';
import { Filter } from './units.model';

export function mapColumnObject<T>(obj: T | undefined | null): string {
  if (!obj) return '';
  return Object.entries(obj)
    .map(([key, value]) => {
      return `${key}: ${value}`;
    })
    .join(', ');
}

export function filterUnits(units: Unit[], filter: Filter): Unit[] {
  return units.filter(
    ({ age, cost }) =>
      (!filter.age || age.toLowerCase() === filter.age) &&
      filter.costs.every(
        ({ name, min, max }) =>
          cost && cost[name] && min <= cost[name] && cost[name] <= max,
      ),
  );
}

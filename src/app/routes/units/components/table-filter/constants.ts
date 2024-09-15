import { KeyValue } from '@angular/common';

export const COSTS = [
  {
    name: 'Wood',
    checked: false,
    min: 0,
    max: 200,
  },
  {
    name: 'Food',
    checked: false,
    min: 0,
    max: 200,
  },
  {
    name: 'Gold',
    checked: false,
    min: 0,
    max: 200,
  },
];

export const AGES: KeyValue<string, string>[] = [
  {
    key: 'All',
    value: '',
  },
  {
    key: 'Dark',
    value: 'dark',
  },
  {
    key: 'Feudal',
    value: 'feudal',
  },
  {
    key: 'Castle',
    value: 'castle',
  },
  {
    key: 'Imperial',
    value: 'imperial',
  },
];

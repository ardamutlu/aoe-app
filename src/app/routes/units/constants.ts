import { Unit } from '@models/units.model';
import { ColumnDefinition } from '@ui/table/table.model';
import { mapColumnObject } from './utils';
import TableActionsComponent from './components/table-actions/table-actions.component';

export const COLUMNS: ColumnDefinition<Unit>[] = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'age',
    label: 'Age',
  },
  {
    key: 'costs',
    label: 'Costs',
    render: (row) => mapColumnObject(row.cost),
  },
  {
    key: 'actions',
    label: 'Actions',
    componentRef: TableActionsComponent,
  },
];

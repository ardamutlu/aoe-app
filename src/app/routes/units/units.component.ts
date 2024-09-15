import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Unit } from '@models/units.model';
import { ColumnDefinition, PaginatorOptions } from '@ui/table/table.model';
import { TableComponent } from '@ui/table/table.component';
import TableActionsComponent from './components/table-actions/table-actions.component';
import TableFilterComponent from './components/table-filter/table-filter.component';
import NotFoundCardComponent from '@ui/not-found-card/not-found-card.component';
import { UnitsStore } from './units.store';
import { COLUMNS } from './constants';

@Component({
  templateUrl: './units.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    TableComponent,
    TableActionsComponent,
    TableFilterComponent,
    NotFoundCardComponent,
  ],
  providers: [UnitsStore],
})
export default class UnitsComponent implements OnInit {
  readonly #store = inject(UnitsStore);
  readonly dataSource = new MatTableDataSource<Unit>([]);
  public columnDefinitions: ColumnDefinition<Unit>[] = COLUMNS;
  public paginatorOptions: PaginatorOptions = {
    length: 0,
    pageIndex: 1,
  };

  constructor() {
    effect(
      () => {
        const data = this.#store.data();
        this.dataSource.data = data;
        this.paginatorOptions = {
          length: data.length,
          pageIndex: 1,
        };
      },
      { allowSignalWrites: true },
    );
  }

  get hasData(): boolean {
    return this.#store.data().length > 0;
  }

  ngOnInit(): void {
    this.#store.getUnits();
  }
}

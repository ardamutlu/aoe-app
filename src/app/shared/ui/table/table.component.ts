import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  viewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PureFunctionPipe } from './pure-function.pipe';
import { ColumnDefinition, PaginatorOptions } from './table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, PureFunctionPipe],
})
export class TableComponent<T> implements AfterViewInit {
  paginator = viewChild.required<MatPaginator>(MatPaginator);
  columnDefinitions = input.required<ColumnDefinition<T>[]>();
  dataSource = input.required<MatTableDataSource<T>>();
  paginatorOptions = input<PaginatorOptions | undefined>();
  defaultPageSize = input<number>(10);
  pageSizeOptions = input<number[]>([5, 10, 20]);
  page = output<PageEvent>();

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator();
  }

  displayedColumnsKeys = computed<string[]>(() =>
    this.columnDefinitions().map((cd) => cd.key),
  );

  onPageChange(event: PageEvent): void {
    this.page.emit(event);
  }
}

import { TemplateRef, Type } from '@angular/core';

export interface BaseColumn {
  key: string;
  label: string;
  class?: string;
}

export interface RenderColumn<T> extends BaseColumn {
  render?: (row: T) => unknown;
  templateRef?: never;
  componentRef?: never;
}

export interface TemplateRefColumn extends BaseColumn {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  templateRef?: TemplateRef<any>;
  render?: never;
  componentRef?: never;
}

export interface ComponentRefColumn extends BaseColumn {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  componentRef?: Type<any>;
  render?: never;
  templateRef?: never;
}

export type ColumnDefinition<T> =
  | RenderColumn<T>
  | TemplateRefColumn
  | ComponentRefColumn;

export interface PaginatorOptions {
  length: number;
  pageIndex: number;
}

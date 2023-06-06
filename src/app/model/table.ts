import { MenuEntry } from './menu';

export interface Table {
  header: string;
  columns: Column[];
  values: any[];
  selectionMode: 'single' | 'multiple' | undefined;
  menu: MenuEntry[];
}
export interface Column {
  header: string;
  field: string;
  ref?: boolean;
}

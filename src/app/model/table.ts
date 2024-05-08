import { MenuEntry } from './menu';

export interface Table {
  header: string;
  columns: Column[];
  values: any[];
  selectionMode: 'single' | 'multiple' | undefined;
  menu: MenuEntry[];
  filtered: boolean;
}
export interface Column {
  header: string;
  field: string;
  ref?: boolean;
}
export interface StructureBrowser {
  header: string;
  columns: Column[];
  values: StructureBrowserEntry[];
  selectionMode: 'single' | 'multiple' | undefined;
  menu: MenuEntry[];
  toggleColumn?: string;
}

export interface StructureBrowserEntry {
  children: StructureBrowserEntry[];
  values: any;
}

export interface Filter {
  kind: 'DATE' | 'STATUS';
  attribute: string;
  field: string;
  value1?: any;
  value2?: any;
}

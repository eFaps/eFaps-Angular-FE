import { MenuEntry } from './menu';

export interface Table {
  header: string;
  columns: Column[];
  values: any[];
  selectionMode: 'single' | 'multiple' | undefined;
  menu: MenuEntry[];
  filtered: boolean;
  page?: Page;
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

export interface Page {
  pageSize: number;
  totalItems: number;
  pageOptions: string[];
}

export interface PagedData {
  values: any[];
  page: Page;
}

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
export interface StructureBrowser {
  header: string;
  columns: Column[];
  values: StructureBrowserEntry[];
  selectionMode: 'single' | 'multiple' | undefined;
  menu: MenuEntry[];
}

export interface StructureBrowserEntry {
  children: StructureBrowserEntry[];
  values: any;
}
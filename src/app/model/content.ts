import { Classification } from './classification';
import { MenuAction, MenuEntry } from './menu';

export interface Content {
  nav: MenuEntry[];
  outline: Outline;
  selected?: string;
}

export interface Outline {
  action?: MenuAction;
  header: string;
  sections: Section[];
  menu?: MenuEntry[];
  oid: string;
  classifications?: Classification[];
}

export function isOutline(obj: any): boolean {
  return 'sections' in obj;
}

export interface Section {
  type: 'FORM' | 'TABLE' | 'HEADING';
  ref?: string;
}

export interface FormSection extends Section {
  items: Array<FormItem | Array<FormItem>>;
}

export interface FormItem {
  type:
    | 'DATETIME'
    | 'DATETIMELABEL'
    | 'DATE'
    | 'INPUT'
    | 'RADIO'
    | 'DROPDOWN'
    | 'BITENUM'
    | 'AUTOCOMPLETE'
    | 'SNIPPLET'
    | 'UPLOAD'
    | 'UPLOADMULTIPLE'
    | 'ATTRSET'
    | 'CHECKBOX'
    | 'TEXTAREA'
    | 'TIME'
    | 'BUTTON'
    | 'CLASSIFICATION'
    | 'PICKLIST'
    | 'IMAGE';
  label: string;
  name: string;
  value?: any;
  options?: Option[];
  ref?: string;
  required?: boolean;
  updateRef?: string;
  navRef?: string;
}

export interface HeadingSection extends Section {
  header: string;
  sections: Section[];
}

export interface TableSection extends Section {
  columns: TableColumn[];
  values: any[];
  editable: boolean;
}

export interface Option {
  label?: string;
  value: any;
}

export interface TableColumn {
  header: string;
  field: string;
  ref?: string;
  type?: 'INPUT' | 'AUTOCOMPLETE';
  updateRef?: string;
}

export interface AttributeSetEntry {
  rowId: number;
  values: Array<FormItem>;
}

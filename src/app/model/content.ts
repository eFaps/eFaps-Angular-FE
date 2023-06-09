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

export interface Section {
  type: 'FORM' | 'TABLE' | 'HEADING';
}

export interface FormSection extends Section {
  items: Array<FormItem | Array<FormItem>>;
}

export interface FormItem {
  type:
    | 'DATETIME'
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
    | 'BUTTON'
    | 'CLASSIFICATION';
  label: string;
  name: string;
  value?: any;
  options?: Option[];
  ref?: string;
  required?: boolean;
  updateRef?: string;
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

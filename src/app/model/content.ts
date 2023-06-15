import { MenuAction, MenuEntry } from './menu';
import { Column } from './table';

export interface Content {
  nav: MenuEntry[];
  outline: Outline;
}

export interface Outline {
  action?: MenuAction;
  header: string;
  sections: Section[];
  menu: MenuEntry[];
  oid: string;
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
    | 'AUTOCOMPLETE';
  label: string;
  name: string;
  value?: any;
  options?: Option[];
  ref?: string;
  required?: boolean;
}

export interface HeadingSection extends Section {
  header: string;
  sections: Section[];
}

export interface TableSection extends Section {
  columns: Column[];
  values: any[];
}

export interface Option {
  label?: string;
  value: any;
}

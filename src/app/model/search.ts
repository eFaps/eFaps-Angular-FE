import { FormSection } from './content';
import { Column, Table } from './table';

export interface Search {
  id: string;
  label: string;
  selected: boolean;
  formSection: FormSection
  children: [];
}

export interface SearchResult extends Table {}

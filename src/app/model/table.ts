export interface Table {
  header: string;
  columns: Column[];
  values: any[];
  selectionMode: 'single' | 'multiple' | undefined;
}
export interface Column {
    header: string;
    field: string;
}
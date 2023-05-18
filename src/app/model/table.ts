export interface Table {
  header: string;
  columns: Column[];
  values: any[];
}
export interface Column {
    header: string;
}
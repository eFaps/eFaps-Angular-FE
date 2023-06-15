export interface MenuEntry {
  id: string;
  label?: string;
  children: MenuEntry[];
  action: MenuAction;
}

export interface MenuAction {
  label?: string;
  modal: boolean;
  type: null | 'SEARCH' | 'EXEC' | 'GRID' | 'FORM';
  verify?: Verifcation;
}

export interface Verifcation {
  question: string;
  selectedRows?: number;
}

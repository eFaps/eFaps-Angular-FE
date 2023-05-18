export interface MenuEntry {
  id: string;
  label?: string;
  children: MenuEntry[];
  action: MenuAction;
}

export interface MenuAction {
  type: null | 'SEARCH' | 'EXEC' | 'GRID';
}

export interface Dashboard {
  pages: DashboardPage[];
}

export interface DashboardPage {
  label?: string;
  items: DashboardItem[];
}

export interface DashboardItem {
  x: number;
  y: number;
  rows: number;
  cols: number;
  widget?: DashboardWidget;
}

export interface DashboardWidget {
  type: 'BARCHART' | 'TABLE';
  identifier: string;
  title?: string;
}

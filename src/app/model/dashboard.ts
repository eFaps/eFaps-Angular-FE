export interface Dashboard {
  pages: DashboardPage[];
}

export interface DashboardPage {
  key: string;
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
  type: 'CHART' | 'TABLE' | 'PLACEHOLDER';
  identifier: string;
  title?: string;
}

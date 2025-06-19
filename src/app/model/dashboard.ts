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
  type: 'CHART' | 'TABLE' | 'PLACEHOLDER' | 'TEMPLATE';
  identifier: string;
  eql?: string;
  title?: string;
}

export interface PlaceHolderWidget extends DashboardWidget {
  type: 'PLACEHOLDER';
}

export interface TableWidget extends DashboardWidget {
  type: 'TABLE';
}

export interface ChartWidget extends DashboardWidget {
  type: 'CHART';
  groupBy?: string[];
  metrics?: Metric[];
}

export interface TemplateWidget extends DashboardWidget {
  type: 'TEMPLATE';
}

export interface Metric {
  function: 'SUM';
  key: string;
}

export interface DashboardTemplate {
  oid: string;
  name: string;
  description?: string;
}

export interface WidgetData {
  widget: DashboardWidget;
  data: any;
}

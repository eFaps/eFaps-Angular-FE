export interface SearchResult {
  hitCount: number;
  elements: ResultElement[];
}

export interface ResultElement {
  oid: string;
  text: string;
}

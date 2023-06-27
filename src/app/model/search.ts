import { Column, Table } from "./table";

export interface Search {
    id: string;
    label: string;
    selected: boolean;
    children: [];
} 

export interface SearchResult extends Table {
    
}
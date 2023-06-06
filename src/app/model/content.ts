import { MenuEntry } from "./menu";

export interface Content { 
    nav: MenuEntry[]
    outline: Outline
}

export interface Outline {
    header: string
}
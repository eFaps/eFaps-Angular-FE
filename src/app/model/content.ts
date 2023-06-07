import { MenuEntry } from "./menu";

export interface Content { 
    nav: MenuEntry[]
    outline: Outline
}

export interface Outline {
    header: string
    sections: Section[]
}

export interface Section {
    type: "FORM" | "TABLE" | "HEADING" 
}

export interface FormSection extends Section {
    items: Array<FormItem | Array<FormItem>> 
}

export interface FormItem {
    label: string
    name: string
    value: string | number | undefined
}

export interface HeadingSection extends Section {
    header: string
    sections: Section[]
}
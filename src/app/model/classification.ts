export interface Classification {
    id: string;
    label: string;
    children: Classification[];
}
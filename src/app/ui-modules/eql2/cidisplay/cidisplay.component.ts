import { Component, input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

export interface EQL2CIResponse {
  id: number;
  type: string;
  name: string;
  uuid: string;
  attributes: Attribute[];
}

interface Attribute {
  name: string;
  type: AttributeType;
}

interface AttributeType {
  name: string;
  info?: string;
}

@Component({
  selector: 'app-cidisplay',
  imports: [AccordionModule],
  templateUrl: './cidisplay.component.html',
  styleUrl: './cidisplay.component.scss',
})
export class CIDisplayComponent {
  eqlCIResponse = input.required<EQL2CIResponse>();
}

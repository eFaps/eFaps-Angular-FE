import { Component, Input } from '@angular/core';
import { FormItem } from 'src/app/model/content';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent {
  @Input()
  formItem: FormItem | undefined;


  
}

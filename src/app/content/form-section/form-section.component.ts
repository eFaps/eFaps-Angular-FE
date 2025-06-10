import { Component, Input } from '@angular/core';

import { FormElementComponent } from '../form-element/form-element.component';
import { FormItem, FormSection } from 'src/app/model/content';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss'],
  imports: [FormElementComponent],
  standalone: true,
})
export class FormSectionComponent {
  _formSection: FormSection | undefined;
  items: any[] = [];

  @Input()
  set formSection(formSection: FormSection) {
    this._formSection = formSection;
    this.items = formSection.items;
  }

  get formSection(): FormSection {
    return this._formSection!!;
  }

  toFormItem(item: any): FormItem {
    return item as FormItem;
  }

  toFormItemArray(item: any): FormItem[] {
    return item as FormItem[];
  }
}

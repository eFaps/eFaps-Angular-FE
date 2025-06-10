import { Component, input } from '@angular/core';
import { PanelModule } from 'primeng/panel';

import { FormSectionComponent } from '../form-section/form-section.component';
import { TableSectionComponent } from '../table-section/table-section.component';
import {
  FormSection,
  HeadingSection,
  Section,
  TableSection,
} from 'src/app/model/content';

@Component({
  selector: 'app-sub-section',
  templateUrl: './sub-section.component.html',
  styleUrls: ['./sub-section.component.scss'],
  imports: [TableSectionComponent, FormSectionComponent, PanelModule],
  standalone: true,
})
export class SubSectionComponent {
  readonly headingSection = input<HeadingSection>();

  toFormSection(section: Section): FormSection {
    return section as FormSection;
  }

  toTableSection(section: Section): TableSection {
    return section as TableSection;
  }
}

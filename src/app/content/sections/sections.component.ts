import { Component, input } from '@angular/core';

import {
  FormSection,
  HeadingSection,
  Section,
  TableSection,
} from '../../model/content';
import { FormSectionComponent } from '../form-section/form-section.component';
import { SubSectionComponent } from '../sub-section/sub-section.component';
import { TableSectionComponent } from '../table-section/table-section.component';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  imports: [FormSectionComponent, TableSectionComponent, SubSectionComponent],
  standalone: true,
})
export class SectionsComponent {
  sections = input.required<Section[]>();

  toHeaderSection(section: Section): HeadingSection {
    return section as HeadingSection;
  }

  toFormSection(section: Section): FormSection {
    return section as FormSection;
  }

  toTableSection(section: Section): TableSection {
    return section as TableSection;
  }
}

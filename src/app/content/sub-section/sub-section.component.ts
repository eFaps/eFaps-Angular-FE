import { Component, input } from '@angular/core';

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
  standalone: false,
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

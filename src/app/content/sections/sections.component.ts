import { Component, input } from '@angular/core';
import {
  FormSection,
  HeadingSection,
  Section,
  TableSection,
} from 'src/app/model/content';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  standalone: false,
})
export class SectionsComponent {
  readonly sections = input<Section[]>([]);

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

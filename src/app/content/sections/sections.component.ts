import { Component, Input } from '@angular/core';
import { FormSection, HeadingSection, Section } from 'src/app/model/content';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent {
  @Input()
  sections: Section[] = []


  toHeaderSection(section: Section): HeadingSection {
    return section as HeadingSection
  }

  toFormSection(section: Section): FormSection {
    return section as FormSection
  }
}

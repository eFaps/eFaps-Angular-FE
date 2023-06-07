import { Component, Input } from '@angular/core';
import { HeadingSection } from 'src/app/model/content';

@Component({
  selector: 'app-sub-section',
  templateUrl: './sub-section.component.html',
  styleUrls: ['./sub-section.component.scss']
})
export class SubSectionComponent {
  @Input()
  headingSection: HeadingSection | undefined

}

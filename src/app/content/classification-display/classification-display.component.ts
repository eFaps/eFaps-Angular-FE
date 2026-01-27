import { Component, input } from '@angular/core';
import { ChipModule } from 'primeng/chip';

import { Classification } from '../../model/classification';

@Component({
  selector: 'app-classification-display',
  templateUrl: './classification-display.component.html',
  styleUrls: ['./classification-display.component.scss'],
  imports: [ChipModule],
  standalone: true,
})
export class ClassificationDisplayComponent {
  readonly classifications = input<Classification[]>();
  readonly editMode = input<Boolean>();
}

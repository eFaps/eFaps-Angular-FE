import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChipModule } from '@openng/optimus-ui/chip';

import { Classification } from '../../model/classification';

@Component({
  selector: 'app-classification-display',
  templateUrl: './classification-display.component.html',
  styleUrls: ['./classification-display.component.scss'],
  imports: [ChipModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class ClassificationDisplayComponent {
  readonly classifications = input<Classification[]>();
  readonly editMode = input<Boolean>();
}

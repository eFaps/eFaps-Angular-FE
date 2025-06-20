import { Component, OnInit, input } from '@angular/core';
import { ChipModule } from 'primeng/chip';

import { Classification } from 'src/app/model/classification';
import { ClassificationService } from 'src/app/services/classification.service';

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

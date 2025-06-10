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
export class ClassificationDisplayComponent implements OnInit {
  readonly classifications = input<Classification[]>();

  constructor(private classificationService: ClassificationService) {}

  ngOnInit(): void {
    this.classificationService.classifications.subscribe({
      next: (classifications) => {
        if (classifications != null) {
          // this.classifications = classifications;
        }
      },
    });
  }
}

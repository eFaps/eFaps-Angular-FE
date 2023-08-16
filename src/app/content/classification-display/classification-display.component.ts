import { Component, Input, OnInit } from '@angular/core';
import { Classification } from 'src/app/model/classification';
import { ClassificationService } from 'src/app/services/classification.service';

@Component({
  selector: 'app-classification-display',
  templateUrl: './classification-display.component.html',
  styleUrls: ['./classification-display.component.scss'],
})
export class ClassificationDisplayComponent implements OnInit {
  @Input()
  classifications: Classification[] | undefined;

  constructor(private classificationService: ClassificationService) {}

  ngOnInit(): void {
    this.classificationService.classifications.subscribe({
      next: (classifications) => {
        if (classifications != null) {
          this.classifications = classifications;
        }
      },
    });
  }
}

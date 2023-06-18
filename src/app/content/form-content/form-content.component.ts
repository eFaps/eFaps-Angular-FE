import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Outline, Section } from 'src/app/model/content';
import { ContentService } from 'src/app/services/content.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-form-content',
  templateUrl: './form-content.component.html',
  styleUrls: ['./form-content.component.scss'],
})
export class FormContentComponent implements OnInit {
  id: string | undefined;
  outline: Outline | undefined;
  sections: Section[] = [];

  constructor(
    valueService: ValueService,
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {
    valueService.reset();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.loadData();
    });
  }

  loadData() {
   
    this.contentService.getContentWithCmd('none', this.id!!).subscribe({
      next: (outline) => {
        this.outline = outline;
        this.sections = outline.sections;
      },
    });
  }
}

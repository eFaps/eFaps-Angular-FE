import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
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
  oid: string = 'none';
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
    combineLatest([this.route.queryParams, this.route.params]).subscribe(
      (parameters) => {
        if (parameters[0]['oid']) {
          this.oid = parameters[0]['oid'];
        }
        this.id = parameters[1]['id'];
        this.loadData();
      }
    );
  }

  loadData() {
    this.contentService.getContentWithCmd(this.oid, this.id!!).subscribe({
      next: (outline) => {
        if ('sections' in outline) {
          this.outline = outline;
          this.sections = outline.sections;
        }
      },
    });
  }
}

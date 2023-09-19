import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { combineLatest } from 'rxjs';
import { Outline, Section } from 'src/app/model/content';
import { MenuEntry } from 'src/app/model/menu';
import { ContentService } from 'src/app/services/content.service';
import { ValueService } from 'src/app/services/value.service';

import { ModalContentComponent } from '../modal-content/modal-content.component';

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
  menuItems: MenuItem[] = [];

  constructor(
    valueService: ValueService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
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
          this.menuItems = outline.menu
            ? outline.menu.map((item) => this.getMenuItem(item))
            : [];
        }
      },
    });
  }

  getMenuItem(item: MenuEntry): MenuItem {
    return {
      id: item.id,
      label: item.label,
      items:
        item.children && item.children.length > 0
          ? item.children.map((item) => this.getMenuItem(item))
          : undefined,
      command: this.evalAction(item),
    };
  }

  evalAction(item: MenuEntry): ((event?: any) => void) | undefined {
    switch (item.action.type) {
      case 'FORM':
        return (event) => {
          this.formAction(item);
        };
    }
    return undefined;
  }

  formAction(item: MenuEntry) {
    if (item.action.modal) {
      this.contentService.getContentWithCmd(this.oid!!, item.id).subscribe({
        next: (outline) => {
          const dialogRef = this.dialogService.open(ModalContentComponent, {
            data: {
              item,
              outline,
            },
          });
          dialogRef.onClose.subscribe({
            next: (execResponse) => {
              if (execResponse != null && execResponse.reload) {
                this.loadData();
              }
            },
          });
        },
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { combineLatest } from 'rxjs';
import { isOutline, Outline, Section } from 'src/app/model/content';
import { MenuEntry } from 'src/app/model/menu';
import { ContentService } from 'src/app/services/content.service';
import { MenuActionProvider, toMenuItems } from 'src/app/services/menu.service';
import { ValueService } from 'src/app/services/value.service';

import { ModalContentComponent } from '../modal-content/modal-content.component';
import { DynamicComponentService } from 'src/app/services/dynamic-component.service';
import { UIModule } from 'src/app/model/module';

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
    private router: Router,
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
      next: (response) => {
        if (isOutline(response)) {
          this.outline = response as Outline;
          this.sections =  this.outline.sections;
          this.menuItems = toMenuItems(this.outline.menu, this.actionProvider);
        } else {
          // its a module
          let module = response as UIModule
          this.router.navigate(['content', 'module', this.id!!], { state: { "module": module}});
        }
      },
    });
  }

  actionProvider: MenuActionProvider = (item: MenuEntry) => {
    switch (item.action.type) {
      case 'FORM':
        return (event) => {
          this.formAction(item);
        };
    }
    return undefined;
  };

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

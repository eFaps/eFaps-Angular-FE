import {
  AfterViewInit,
  Component,
  OnInit,
  ViewContainerRef,
  viewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { combineLatest } from 'rxjs';
import { Outline, Section, isOutline } from 'src/app/model/content';
import { MenuEntry } from 'src/app/model/menu';
import { UIModule } from 'src/app/model/module';
import { ContentService } from 'src/app/services/content.service';
import { DynamicComponentService } from 'src/app/services/dynamic-component.service';
import { MenuActionProvider, toMenuItems } from 'src/app/services/menu.service';
import { ValueService } from 'src/app/services/value.service';

import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-form-content',
  templateUrl: './form-content.component.html',
  styleUrls: ['./form-content.component.scss'],
  standalone: false,
})
export class FormContentComponent implements OnInit, AfterViewInit {
  id: string | undefined;
  oid: string = 'none';
  outline: Outline | undefined;
  sections: Section[] = [];
  menuItems: MenuItem[] = [];

  readonly vcr = viewChild.required('dynamicComponent', {
    read: ViewContainerRef,
  });
  module: UIModule | undefined;
  moduleLoaded = false;

  constructor(
    valueService: ValueService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private contentService: ContentService,
    private dynamicComponentService: DynamicComponentService,
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
      },
    );
  }

  ngAfterViewInit(): void {
    this.loadModule();
  }

  loadData() {
    this.contentService.getContentWithCmd(this.oid, this.id!!).subscribe({
      next: (response) => {
        if (isOutline(response)) {
          this.outline = response as Outline;
          this.sections = this.outline.sections;
          this.menuItems = toMenuItems(this.outline.menu, this.actionProvider);
        } else {
          // its a module
          this.module = response as UIModule;
          this.loadModule();
        }
      },
    });
  }

  loadModule() {
    if (this.isModule() && !this.moduleLoaded) {
      this.moduleLoaded = true;
      this.vcr().clear();
      this.dynamicComponentService.loadUIModule(this.vcr(), this.module!!, {
        oid: undefined,
        parentOid: undefined,
      });
    }
  }

  isModule() {
    return !(this.module == undefined);
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

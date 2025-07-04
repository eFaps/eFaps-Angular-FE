import {
  AfterViewInit,
  Component,
  OnInit,
  ViewContainerRef,
  viewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { combineLatest } from 'rxjs';

import { ClassificationDisplayComponent } from '../classification-display/classification-display.component';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { SectionsComponent } from '../sections/sections.component';
import { Outline, Section, isOutline } from 'src/app/model/content';
import { MenuEntry } from 'src/app/model/menu';
import { UIModule } from 'src/app/model/module';
import { ContentService } from 'src/app/services/content.service';
import { DynamicComponentService } from 'src/app/services/dynamic-component.service';
import { MenuActionProvider, toMenuItems } from 'src/app/services/menu.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-form-content',
  templateUrl: './form-content.component.html',
  styleUrls: ['./form-content.component.scss'],
  imports: [
    SectionsComponent,
    ClassificationDisplayComponent,
    ButtonModule,
    MenuModule,
    ToolbarModule,
    ConfirmDialogModule,
  ],
  standalone: true,
})
export class FormContentComponent implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private dialogService = inject(DialogService);
  private contentService = inject(ContentService);
  private dynamicComponentService = inject(DynamicComponentService);

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

  constructor() {
    const valueService = inject(ValueService);

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

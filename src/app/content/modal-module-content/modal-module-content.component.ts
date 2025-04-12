import {
  AfterViewInit,
  Component,
  ViewContainerRef,
  viewChild,
} from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { DynamicComponentService } from 'src/app/services/dynamic-component.service';

@Component({
  selector: 'app-modal-module-content',
  templateUrl: './modal-module-content.component.html',
  styleUrls: ['./modal-module-content.component.scss'],
  standalone: false,
})
export class ModalModuleContentComponent implements AfterViewInit {
  readonly vcr = viewChild.required('dynamicComponent', {
    read: ViewContainerRef,
  });

  constructor(
    private config: DynamicDialogConfig,
    private dynamicComponentService: DynamicComponentService,
  ) {}

  ngAfterViewInit(): void {
    if (this.config.data.uimodule) {
      this.vcr().clear();
      this.dynamicComponentService.loadUIModule(
        this.vcr(),
        this.config.data.uimodule,
        this.config.data,
      );
    }
  }
}

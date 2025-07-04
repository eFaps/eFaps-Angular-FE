import {
  AfterViewInit,
  Component,
  ViewContainerRef,
  viewChild,
  inject,
} from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { DynamicComponentService } from 'src/app/services/dynamic-component.service';

@Component({
  selector: 'app-modal-module-content',
  templateUrl: './modal-module-content.component.html',
  styleUrls: ['./modal-module-content.component.scss'],
  standalone: true,
})
export class ModalModuleContentComponent implements AfterViewInit {
  private config = inject(DynamicDialogConfig);
  private dynamicComponentService = inject(DynamicComponentService);

  readonly vcr = viewChild.required('dynamicComponent', {
    read: ViewContainerRef,
  });

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

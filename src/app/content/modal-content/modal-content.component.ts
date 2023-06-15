import { Component } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Outline, Section } from 'src/app/model/content';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent {
  outline: Outline;

  constructor(
    config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {
    this.outline = config.data;
    config.header = this.outline.header;
    config.maximizable = true;
  }
}

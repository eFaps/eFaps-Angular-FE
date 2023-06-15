import { Component } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Outline, Section } from 'src/app/model/content';
import { MenuEntry } from 'src/app/model/menu';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent {
  outline: Outline;
  callingMenu: MenuEntry
  constructor(
    config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {
    this.outline = config.data.outline;
    this.callingMenu = config.data.item
    config.header = this.outline.header;
    config.maximizable = true;
  }
}

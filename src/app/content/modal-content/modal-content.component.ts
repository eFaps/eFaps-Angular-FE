import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Outline } from 'src/app/model/content';
import { MenuEntry } from 'src/app/model/menu';
import { ClassificationService } from 'src/app/services/classification.service';
import { ExecService } from 'src/app/services/exec.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit {
  outline: Outline;
  callingMenu: MenuEntry;
  values: Map<String, any> | undefined;

  constructor(
    config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private valueService: ValueService,
    private classificationService: ClassificationService,
    private execService: ExecService
  ) {
    this.valueService.reset();
    this.outline = config.data.outline;
    this.callingMenu = config.data.item;
    config.header = this.outline.header;
    config.maximizable = true;
    if (this.outline.classifications) {
      this.classificationService.setClassifications(
        this.outline.classifications
      );
    }
  }

  ngOnInit(): void {
    this.valueService.values.subscribe({
      next: (values) => {
        console.log(values);
        this.values = values;
      },
    });
    if (this.outline.oid != 'none') {
      this.valueService.addEntry({ name: 'eFapsOID', value: this.outline.oid });
    }
  }

  submit() {
    this.execService.exec(this.callingMenu.id, this.values).subscribe({
      next: (execResponse) => {
        this.dialogRef.close(execResponse);
      },
    });
  }
}

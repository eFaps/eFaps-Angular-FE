import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Classification } from 'src/app/model/classification';
import { Outline, Section } from 'src/app/model/content';
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
  classifications: Classification[] | undefined;

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
    this.dialogRef.onClose.subscribe({
      next: (_) => {
        this.classificationService.setClassifications([]);
      },
    });
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
    this.classificationService.classifications.subscribe({
      next: (classifications) => {
        this.classifications = classifications;
        const toBeRemoved: Section[] = [];
        this.outline.sections.forEach((section) => {
          if (section.ref != null) {
            if (
              classifications.find((clazz) => {
                return clazz.id == section.ref;
              }) == null
            ) {
              toBeRemoved.push(section);
            }
          }
        });

        toBeRemoved.forEach((section) => {
          const index = this.outline.sections.indexOf(section);
          if (index !== -1) {
            this.outline.sections.splice(index, 1);
          }
        });

        classifications.forEach((classification) => {
          let existing =
            this.outline.classifications != null &&
            this.outline.classifications.find((clazz) => {
              return clazz.id == classification.id;
            }) != null;
          if (!existing) {
            this.classificationService.getSections(classification).subscribe({
              next: (sections) => {
                this.outline.sections.push(...sections);
              },
            });
          }
        });
      },
    });
  }

  submit() {
    if (this.classifications != null) {
      this.values?.set('eFapsClassifications', [
        ...this.classifications!!.map((clazz) => {
          return clazz.id;
        }),
      ]);
    }
    this.execService.exec(this.callingMenu.id, this.values).subscribe({
      next: (execResponse) => {
        this.dialogRef.close(execResponse);
      },
    });
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Classification } from 'src/app/model/classification';
import { Outline, Section } from 'src/app/model/content';
import { MenuEntry } from 'src/app/model/menu';
import { ClassificationService } from 'src/app/services/classification.service';
import { ExecService } from 'src/app/services/exec.service';
import { ValidationService } from 'src/app/services/validation.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
  standalone: false,
})
export class ModalContentComponent implements OnInit {
  private valueService = inject(ValueService);
  private validationService = inject(ValidationService);
  private classificationService = inject(ClassificationService);
  private execService = inject(ExecService);

  outline: Outline;
  callingMenu: MenuEntry;
  values: Map<String, any> | undefined;
  classifications: Classification[] | undefined;
  parentOid: string | undefined;

  constructor(
    config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
  ) {
    this.valueService.reset();
    this.validationService.reset();
    this.outline = config.data.outline;
    this.callingMenu = config.data.item;
    this.parentOid = config.data.parentOid;
    config.header = this.outline.header;
    config.maximizable = true;
    config.closable = true;
    if (this.outline.classifications) {
      this.classificationService.setClassifications(
        this.outline.classifications,
      );
    }
    this.dialogRef.onClose.subscribe({
      next: (_) => {
        this.classificationService.setClassifications([]);
      },
    });
  }

  ngOnInit(): void {
    this.outline = this.outline;
    this.valueService.values.subscribe({
      next: (values) => {
        console.log(values);
        this.values = values;
      },
    });
    if (this.outline.oid != 'none') {
      this.valueService.addEntry({ name: 'eFapsOID', value: this.outline.oid });
    }
    if (this.parentOid != null) {
      this.valueService.addEntry({
        name: 'eFapsParentOID',
        value: this.parentOid,
      });
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
    if (this.validationService.isValid(this.values)) {
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
}

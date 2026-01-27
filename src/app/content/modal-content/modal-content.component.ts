import { Component, effect, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { forkJoin, Observable } from 'rxjs';

import { Classification } from '../../model/classification';
import { Outline, Section } from '../../model/content';
import { MenuEntry } from '../../model/menu';
import { ClassificationService } from '../../services/classification.service';
import { ExecService } from '../../services/exec.service';
import { ValidationService } from '../../services/validation.service';
import { ValueService } from '../../services/value.service';
import { ClassificationDisplayComponent } from '../classification-display/classification-display.component';
import { SectionsComponent } from '../sections/sections.component';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
  imports: [
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    SectionsComponent,
    ClassificationDisplayComponent,
  ],
})
export class ModalContentComponent {
  private valueService = inject(ValueService);
  private validationService = inject(ValidationService);
  private classificationService = inject(ClassificationService);
  private execService = inject(ExecService);
  private dialogRef = inject(DynamicDialogRef);

  sections = signal<Section[]>([]);
  classifications = this.classificationService.classifications;
  loading = signal<Boolean>(false);

  outline: Outline;
  callingMenu: MenuEntry;
  parentOid: string | undefined;

  //values: Map<String, any> | undefined;

  private sectionsStore: Section[] = [];
  constructor() {
    const config = inject(DynamicDialogConfig);

    config.header = config.data.outline.header;
    config.maximizable = true;
    config.closable = true;
    config.modal = true;
    config.style = { 'max-width': '99vw' };

    const data = config.data;
    this.callingMenu = data.item;
    this.outline = data.outline;

    this.init(data);
    if (this.outline.classifications) {
      this.sectionsStore = data.outline.sections;

      effect(() => {
        let classifications = this.classificationService.classifications();
        if (classifications) {
          this.onClassificationChange(classifications);
        }
      });
      effect(() => {
        this.sectionsStore = this.sections();
      });
      this.classificationService.setClassifications(
        data.outline.classifications,
      );
    } else {
      this.sections.set(data.outline.sections);
    }
  }

  private init(data: any) {
    this.valueService.reset();
    this.validationService.reset();

    if (this.outline.oid != 'none') {
      this.valueService.addEntry({
        name: 'eFapsOID',
        value: this.outline.oid,
      });
    }
    this.parentOid = data.parentOid;
    if (this.parentOid) {
      this.valueService.addEntry({
        name: 'eFapsParentOID',
        value: this.parentOid,
      });
    }
    if (data.eFapsSelectedOids) {
      this.valueService.addEntry({
        name: 'eFapsSelectedOids',
        value: data.eFapsSelectedOids,
      });
    }
  }

  onClassificationChange(classifications: Classification[]) {
    const currentSections = this.sectionsStore;
    const targetSections: Section[] = [];
    const classSections: Map<string, Section[]> = new Map();

    // build a temp mapping
    currentSections.forEach((section) => {
      if (section.ref != null) {
        let sections: Section[];
        if (classSections.has(section.ref)) {
          sections = classSections.get(section.ref)!;
        } else {
          sections = [];
        }
        sections.push(section);
        classSections.set(section.ref, sections);
      } else {
        targetSections.push(section);
      }
    });
    const sectionCall: Observable<Section[]>[] = [];
    // verify that all classification sections are mapped
    classifications.forEach((clazz) => {
      if (!classSections.has(clazz.id)) {
        sectionCall.push(this.classificationService.getSections(clazz));
      }
    });

    if (sectionCall.length > 0) {
      forkJoin(sectionCall).subscribe({
        next: (sectionsResp) => {
          sectionsResp.forEach((sections) => {
            classSections.set(sections[0].ref!!, sections);
          });
          this.updateSections(classifications, targetSections, classSections);
        },
      });
    } else {
      this.updateSections(classifications, targetSections, classSections);
    }
  }

  private updateSections(
    classifications: Classification[],
    targetSections: Section[],
    classSections: Map<string, Section[]>,
  ) {
    classifications.forEach((clazz) => {
      targetSections.push(...classSections.get(clazz.id)!!);
    });
    this.sections.set(targetSections);
  }

  submit() {
    let values = this.valueService.values();
    if (this.validationService.isValid(values)) {
      this.loading.set(true);
      if (this.classifications != null) {
        values?.set('eFapsClassifications', [
          ...this.classifications()!!.map((clazz) => {
            return clazz.id;
          }),
        ]);
      }
      this.execService.exec(this.callingMenu.id, values).subscribe({
        next: (execResponse) => {
          this.dialogRef.close(execResponse);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
    }
  }
}

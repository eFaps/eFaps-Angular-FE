import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { UIModule } from 'src/app/model/module';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-system-configuration-attribute',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ToggleButtonModule,
  ],
  templateUrl: './system-configuration-attribute.component.html',
  styleUrls: ['./system-configuration-attribute.component.scss'],
})
export class SystemConfigurationAttributeComponent implements OnInit {
  @Input()
  uimodule: UIModule | undefined;
  @Input()
  oid: string | undefined;

  key: string = '';
  description: string = '';
  strValue: string = '';
  booleanValue: boolean = false;

  type: string = 'UNDEFINED';

  constructor(
    config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private http: HttpClient,
    private utilService: UtilService
  ) {
    config.header = 'Edit SystemConfiguration Attribute';
  }

  ngOnInit(): void {
    const url = `${this.utilService.evalApiUrl()}/ui/modules/system-configurations/${
      this.oid
    }`;
    this.http.get<any>(url).subscribe({
      next: (attr) => {
        this.key = attr.key;
        this.description = attr.description;
        this.type = attr.type;

        switch (attr.type) {
          case 'BOOLEAN':
            this.booleanValue = String(attr.value).toLowerCase() == 'true';
            break;

          default:
            this.strValue = attr.value;
        }
      },
    });
  }

  submit() {
    const url = `${this.utilService.evalApiUrl()}/ui/modules/system-configurations/${
      this.oid
    }`;
    this.http
      .post(url, {
        key: this.key,
        value: this.getValue(),
        description: this.description,
      })
      .subscribe({
        next: (_) => {
          this.dialogRef.close({ reload: true });
        },
      });
  }

  getValue(): any {
    let value = '';
    switch (this.type) {
      case 'BOOLEAN':
        value = '' + this.booleanValue;
        break;
      default:
        value = this.strValue;
    }
    return value;
  }
}

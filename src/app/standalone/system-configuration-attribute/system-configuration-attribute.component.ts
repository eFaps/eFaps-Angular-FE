import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ModuleData, UIModule } from 'src/app/model/module';
import { Company } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'app-system-configuration-attribute',
    imports: [
        AutoCompleteModule,
        CommonModule,
        ButtonModule,
        SelectModule,
        FormsModule,
        InputTextModule,
        TextareaModule,
        ToggleButtonModule,
        FloatLabelModule,
    ],
    templateUrl: './system-configuration-attribute.component.html',
    styleUrls: ['./system-configuration-attribute.component.scss']
})
export class SystemConfigurationAttributeComponent implements OnInit {
  @Input()
  uimodule: UIModule | undefined;
  @Input()
  data: ModuleData | undefined;

  buttonLabel: string = 'Update';

  keys: [] = [];
  key: any = undefined;
  description: string = '';
  strValue: string = '';
  booleanValue: boolean = false;

  companies: Company[] = [];
  company: Company | undefined;

  appKey: string | undefined;

  type: string = 'UNDEFINED';

  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private http: HttpClient,
    private utilService: UtilService,
    private userService: UserService
  ) {
    config.header = 'Edit SystemConfiguration Attribute';
    config.closable = true;
    config.width = '800px';
  }

  ngOnInit(): void {
    this.userService.getCompanies().subscribe({
      next: (companies) => {
        this.companies = [
          { oid: '', current: false, name: '', uuid: '' },
          ...companies,
        ];
      },
    });

    if (this.uimodule?.targetMode == 'CREATE') {
      this.buttonLabel = 'Create';
      this.config.header = 'Create SystemConfiguration Attribute';
    } else {
      const url = `${this.utilService.evalApiUrl()}/ui/modules/system-configurations/${
        this.data?.parentOid
      }/attributes/${this.data?.oid}`;
      this.http.get<any>(url).subscribe({
        next: (attr) => {
          this.key = {
            key: attr.key,
            type: attr.type,
          };
          this.description = attr.description;
          this.type = attr.type;
          this.setValue(attr.value);
          this.appKey = attr.appKey;
          this.setCompany(attr.companyLink);
        },
      });
    }
  }

  submit() {
    if (this.uimodule?.targetMode == 'CREATE') {
      const url = `${this.utilService.evalApiUrl()}/ui/modules/system-configurations/${
        this.data?.parentOid
      }/attributes`;
      this.http
        .post(url, {
          key: this.keyStr,
          value: this.getValue(),
          description: this.description,
          appKey: this.appKey,
          companyLink: this.companyLink,
          type: this.type
        })
        .subscribe({
          next: (_) => {
            this.dialogRef.close({ reload: true });
          },
        });
    } else {
      const url = `${this.utilService.evalApiUrl()}/ui/modules/system-configurations/${
        this.data?.parentOid
      }/attributes/${this.data?.oid}`;
      this.http
        .put(url, {
          key: this.keyStr,
          value: this.getValue(),
          description: this.description,
          appKey: this.appKey,
          companyLink: this.companyLink,
          type: this.type
        })
        .subscribe({
          next: (_) => {
            this.dialogRef.close({ reload: true });
          },
        });
    }
  }

  getValue(): any {
    let value = '';
    switch (this.type) {
      case 'BOOLEAN':
        value = '' + this.booleanValue;
        break;
      case 'LIST':
        value = JSON.stringify(('' + this.strValue).split("\n"))
        break;
      default:
        value = this.strValue;
    }
    return value;
  }

  setValue(value: string) {
    switch (this.type) {
      case 'BOOLEAN':
        this.booleanValue = String(value).toLowerCase() == 'true';
        break;
      case 'PROPERTIES':
        try {
          const propObj = JSON.parse(value);
          if (propObj != null) {
            Object.keys(propObj).forEach((key) => {
              this.strValue = this.strValue + key + '=' + propObj[key] + '\n';
            });
          }
        } catch (error) {
          this.strValue = value;
        }
        break;
      case 'LIST': 
        if (value.startsWith("[")) {
          const list = JSON.parse(value);
          if (list != null && list.length) {
            (list as Array<string>).forEach(entry => {
                this.strValue = this.strValue + entry + '\n';
              }
            )
          }
        } else {
          this.strValue = value;
        }
        break;
      default:
        this.strValue = value;
    }
  }

  setCompany(companyLink: number | null) {
    let found = this.companies.find((company) => {
      if (company.oid.length > 0) {
        return (company.oid as string).split('.')[1] == companyLink?.toString();
      }
      return false;
    });
    if (found) {
      this.company = found;
    }
  }

  get companyLink() {
    if (this.company && this.company?.oid.length > 0) {
      return (this.company.oid as string).split('.')[1];
    } else {
      return null;
    }
  }

  loadKeys(event: AutoCompleteCompleteEvent) {
    const url = `${this.utilService.evalApiUrl()}/ui/modules/system-configurations/${
      this.data?.parentOid
    }/attributes`;
    this.http.get<any>(url).subscribe({
      next: (keys) => (this.keys = keys),
    });
  }

  onKeySelect(value: any) {
    this.type = this.key.type;
    this.description = this.key.description;
    this.setValue(this.key.defaultValue);
  }

  onKeyBlur(event: Event) {
    if (typeof this.key == 'string') {
      this.type = 'UNDEFINED';
    } else {
      this.type = this.key.type;
    }
  }

  get keyStr(): string {
    return typeof this.key == 'string' ? this.key : this.key.key;
  }
}

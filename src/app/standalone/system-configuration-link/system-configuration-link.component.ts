
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ModuleData, UIModule } from 'src/app/model/module';
import { Company } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-system-configuration-link',
  imports: [
    AutoCompleteModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    InputTextModule,
    TextareaModule,
    ToggleButtonModule
],
  templateUrl: './system-configuration-link.component.html',
  styleUrl: './system-configuration-link.component.scss',
})
export class SystemConfigurationLinkComponent implements OnInit {
  readonly uimodule = input<UIModule>();
  readonly data = input<ModuleData>();

  buttonLabel: string = 'Update';

  keys: [] = [];
  key: any = undefined;
  description: string = '';
  strValue: string = '';

  companies: Company[] = [];
  company: Company | undefined;

  appKey: string | undefined;

  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private http: HttpClient,
    private utilService: UtilService,
    private userService: UserService
  ) {
    config.header = 'Edit SystemConfiguration Attribute';
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

    if (this.uimodule()?.targetMode == 'CREATE') {
      this.buttonLabel = 'Create';
      this.config.header = 'Create SystemConfiguration Attribute';
    } else {
      const data = this.data();
      const url = `${this.utilService.evalApiUrl()}/ui/modules/system-configurations/${
        data?.parentOid
      }/links/${data?.oid}`;
      this.http.get<any>(url).subscribe({
        next: (link) => {
          this.key = link.key;
          this.description = link.description;
          this.setValue(link.value);
          this.appKey = link.appKey;
          this.setCompany(link.companyLink);
        },
      });
    }
  }

  submit() {
    if (this.uimodule()?.targetMode == 'CREATE') {
      const url = `${this.utilService.evalApiUrl()}/ui/modules/system-configurations/${
        this.data()?.parentOid
      }/links`;
      this.http
        .post(url, {
          key: this.keyStr,
          value: this.getValue(),
          description: this.description,
          appKey: this.appKey,
          companyLink: this.companyLink,
        })
        .subscribe({
          next: (_) => {
            this.dialogRef.close({ reload: true });
          },
        });
    } else {
      const data = this.data();
      const url = `${this.utilService.evalApiUrl()}/ui/modules/system-configurations/${
        data?.parentOid
      }/links/${data?.oid}`;
      this.http
        .put(url, {
          key: this.keyStr,
          value: this.getValue(),
          description: this.description,
          appKey: this.appKey,
          companyLink: this.companyLink,
        })
        .subscribe({
          next: (_) => {
            this.dialogRef.close({ reload: true });
          },
        });
    }
  }

  getValue(): any {
    return this.strValue;
  }

  setValue(value: string) {
    this.strValue = value;
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
      this.data()?.parentOid
    }/links`;
    this.http.get<any>(url).subscribe({
      next: (keys) => (this.keys = keys),
    });
  }

  onKeySelect(value: any) {
    this.description = this.key.description;
    this.setValue(this.key.defaultValue);
  }

  get keyStr(): string {
    return typeof this.key == 'string' ? this.key : this.key.key;
  }
}

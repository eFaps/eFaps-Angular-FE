import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectModule } from 'primeng/select';

import { Company } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-company-chooser',
  imports: [SelectModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './company-chooser.component.html',
  styleUrls: ['./company-chooser.component.scss'],
})
export class CompanyChooserComponent implements OnInit {
  private userService = inject(UserService);
  private dialogRef = inject(DynamicDialogRef);

  companies: Company[] = [];
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      company: new FormControl<Company | undefined>(undefined),
    });
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.companies = user.companies;
        const selected = this.companies.find((company) => {
          return company.current == true;
        });
        this.formGroup.controls['company'].setValue(selected);
      },
    });
  }

  submit() {
    this.dialogRef.close(this.formGroup.controls['company'].value);
  }
}

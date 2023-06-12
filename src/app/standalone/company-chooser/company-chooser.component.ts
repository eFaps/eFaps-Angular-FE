import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { Company } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-company-chooser',
  standalone: true,
  imports: [CommonModule, DropdownModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './company-chooser.component.html',
  styleUrls: ['./company-chooser.component.scss'],
})
export class CompanyChooserComponent implements OnInit {
  companies: Company[] = [];
  formGroup: FormGroup;

  constructor(
    private userService: UserService,
    private dialogRef: DynamicDialogRef
  ) {
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

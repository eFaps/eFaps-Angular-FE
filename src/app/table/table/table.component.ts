import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  id: string | undefined;
  cols:any[] = []
  elements:any[] = []
  selectionMode: "single" | "multiple" | null | undefined = null;
  selectedElements: any;
  title: string = ""
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.loading = true;    
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.tableService.getTable(this.id!!).subscribe({
        next: val =>  {
          this.title = val.header
          this.cols = val.columns
          this.elements = val.values
          this.selectionMode = val.selectionMode
          this.loading = false;
        }
      });
    });
  }
}

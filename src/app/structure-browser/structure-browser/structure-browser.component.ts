import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, TreeNode } from 'primeng/api';

import { combineLatest } from 'rxjs';
import { StructureBrowserEntry } from 'src/app/model/table';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-structure-browser',
  templateUrl: './structure-browser.component.html',
  styleUrls: ['./structure-browser.component.scss']
})
export class StructureBrowserComponent implements OnInit {
  loading: boolean;
  id: any;
  oid: any;
  title: string = '';
  cols: any[] = [];
  menuItems: MenuItem[] = [];
  globalSearch = '';
  selectionMode: 'single' | 'multiple' | null | undefined = null;
  elements: TreeNode[] = [];

  constructor(private route: ActivatedRoute, private tableService: TableService) {
    this.loading = true;

  }
  ngOnInit(): void {
    combineLatest([this.route.queryParams, this.route.params]).subscribe(
      (parameters) => {
        this.id = parameters[1]['id'];
        this.oid = parameters[0]['oid'];

        this.loadData();
      }
    );
  }
  loadData() {
    this.tableService.getStructureBrowser(this.id!!, this.oid).subscribe({
      next: (val) => {
        this.title = val.header;
        this.cols = val.columns;
        this.elements = val.values.map(entry => this.toTreeNode(entry))
      }
    })
  }

  toTreeNode(entry: StructureBrowserEntry):TreeNode {
    return {
      data: entry.values,
      children: entry.children.map(entry => this.toTreeNode(entry))
    }
  }
}

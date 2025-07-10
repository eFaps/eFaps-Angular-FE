import { HttpClient } from '@angular/common/http';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { TreeModule } from 'primeng/tree';

import { UIModule } from 'src/app/model/module';
import { UtilService } from 'src/app/services/util.service';
import { ValueService } from 'src/app/services/value.service';

interface ProductFamily {
  oid: string;
  label: string;
  codePart: string;
  parentOid?: string;
  children: ProductFamily[];
}

@Component({
  selector: 'app-product-family',
  imports: [ButtonModule, DialogModule, TreeModule, TagModule],
  templateUrl: './product-family.component.html',
  styleUrl: './product-family.component.scss',
})
export class ProductFamilyComponent implements OnInit {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);
  private valueService = inject(ValueService);

  readonly uimodule = input<UIModule>();

  familyCode = signal<string>('');
  familyLabels = signal<string[]>([]);
  dialogVisible: boolean = false;
  loading = signal<boolean>(true);
  nodes = signal<TreeNode[]>([]);
  selection: TreeNode | undefined;

  productOid: string | undefined;

  ngOnInit(): void {
    const module = this.uimodule();
    if (module?.targetMode == 'EDIT') {
      this.productOid = this.valueService.values().get('eFapsOID');
      this.loadTree(true);
    }
  }

  select() {
    this.loadTree(false);
    this.dialogVisible = true;
  }

  loadTree(update: boolean) {
    if (this.loading()) {
      const url = `${this.utilService.evalApiUrl()}/ui/modules/product-family`;
      const params: any = this.productOid
        ? { productOid: this.productOid }
        : {};

      this.http.get<any>(url, { params }).subscribe({
        next: (response) => {
          const nodes: TreeNode[] = [];
          response.families.forEach((element: ProductFamily) => {
            nodes.push(this.toTreeNode(element, response.current));
          });
          this.nodes.set(nodes);
          this.loading.set(false);
          if (update) {
            this.update();
            this.expandSelected();
          }
        },
      });
    }
  }

  private toTreeNode(element: ProductFamily, current?: string): TreeNode {
    const node = {
      label: element.label,
      key: element.oid,
      data: element.codePart,
      children: element.children.map((child) => {
        return this.toTreeNode(child, current);
      }),
    };
    node.children.forEach((child) => {
      child.parent = node;
    });

    if (current && node.key == current) {
      this.selection = node;
    }
    return node;
  }

  isValid() {
    return this.selection && this.selection.children?.length == 0;
  }

  update() {
    this.dialogVisible = false;
    const parts: string[] = [];
    const labels: string[] = [];
    if (this.selection) {
      let current = this.selection;
      parts.push(current.data);
      labels.push(current.label!);
      while (current.parent) {
        current = current.parent;
        parts.push(current.data);
        labels.push(current.label!);
      }
    }
    this.familyCode.set(parts.reverse().join(''));
    this.familyLabels.set(labels.reverse());
    this.valueService.addEntry({
      name: 'productFamilyLink',
      value: this.selection?.key,
    });
  }

  expandSelected() {
    if (this.selection) {
      let current = this.selection;
      current.expanded = true;
      while (current.parent) {
        current = current.parent;
        current.expanded = true;
      }
    }
  }
}

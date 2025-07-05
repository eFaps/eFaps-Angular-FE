import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';

import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-product-family',
  imports: [ButtonModule, DialogModule, TreeModule, TagModule],
  templateUrl: './product-family.component.html',
  styleUrl: './product-family.component.scss',
})
export class ProductFamilyComponent {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);

  familyCode = signal<string>('');
  familyLabels = signal<string[]>([]);
  dialogVisible: boolean = false;
  loading = signal<boolean>(true);
  nodes = signal<TreeNode[]>([]);
  selection: TreeNode | undefined;

  select() {
    this.loadTree();
    this.dialogVisible = true;
  }

  loadTree() {
    if (this.loading()) {
      const url = `${this.utilService.evalApiUrl()}/ui/modules/product-family`;
      this.http.get<any>(url).subscribe({
        next: (families) => {
          const nodes: TreeNode[] = [];
          families.forEach((element: ProductFamily) => {
            nodes.push(this.toTreeNode(element));
          });
          this.nodes.set(nodes);
          this.loading.set(false);
        },
      });
    }
  }

  toTreeNode(element: ProductFamily): TreeNode {
    return {
      label: element.label,
      key: element.oid,
      data: element.codePart,
      children: element.children.map((xx) => {
        return this.toTreeNode(xx);
      }),
    };
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
  }
}
interface ProductFamily {
  oid: string;
  label: string;
  codePart: string;
  parentOid?: string;
  children: ProductFamily[];
}

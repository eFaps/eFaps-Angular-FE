import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-product-family',
  imports: [ButtonModule, DialogModule, TreeModule],
  templateUrl: './product-family.component.html',
  styleUrl: './product-family.component.scss'
})
export class ProductFamilyComponent {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);

  dialogVisible: boolean = false;
  loading = signal<boolean>(true)
  nodes = signal<TreeNode[]>([])
  selection: TreeNode | undefined
  

  select() {
    this.loadTree()
    this.dialogVisible = true
  }

  loadTree() {
     const url = `${this.utilService.evalApiUrl()}/ui/modules/product-family`;
      this.http.get<any>(url).subscribe({
        next: (families) => {
          const nodes: TreeNode[]= []
          families.forEach((element: ProductFamily) => {
            nodes.push(this.toTreeNode(element))
          });
          this.nodes.set(nodes)
          this.loading.set(false)
        },
      });
  }

  toTreeNode(element: ProductFamily):TreeNode {
    
    return {
              label: element.label,
              key: element.oid,
              children: element.children.map(xx => { return this.toTreeNode(xx)})
            }
  }

  isValid() {
    return this.selection && this.selection.children?.length == 0
  }

}
 interface ProductFamily {
    oid: string,
    label: string,
    parentOid?: string,
    children: ProductFamily[]
  }

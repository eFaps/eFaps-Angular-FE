import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  TreeModule,
  TreeNodeSelectEvent,
  TreeNodeUnSelectEvent,
} from 'primeng/tree';

import { Classification } from 'src/app/model/classification';
import { ClassificationService } from 'src/app/services/classification.service';

@Component({
  selector: 'app-classifications',
  templateUrl: './classifications.component.html',
  styleUrls: ['./classifications.component.scss'],
  imports: [TreeModule, ButtonModule],
  standalone: true,
})
export class ClassificationsComponent implements OnInit {
  classUUIDs: string[];
  treeNodes: TreeNode[] = [];
  selection: TreeNode<any> | TreeNode<any>[] | null = [];
  preSelected: Classification[] = [];

  constructor(
    config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private classificationService: ClassificationService,
  ) {
    this.classUUIDs = config.data.classUUIDs;
  }

  ngOnInit(): void {
    this.preSelected = this.classificationService.classifications();

    this.classificationService.getClassifications(this.classUUIDs).subscribe({
      next: (tree) => {
        tree.forEach((entry) => {
          const treeNode = this.getTreeNode(entry);
          treeNode.expanded = true;
          this.treeNodes.push(treeNode);
        });
        this.evalPreselected(this.treeNodes);
      },
    });
  }

  get selected(): TreeNode<Classification>[] {
    return this.selection as TreeNode<Classification>[];
  }

  evalPreselected(treeNodes: TreeNode[]) {
    treeNodes.forEach((treeNode) => {
      if (
        this.preSelected.findIndex((entry) => {
          return entry.id == treeNode.data.id;
        }) > -1
      ) {
        this.selected.push(treeNode);
      }
      if (treeNode.children) {
        this.evalPreselected(treeNode.children);
      }
    });
  }

  getTreeNode(classification: Classification): TreeNode {
    return {
      label: classification.label,
      data: classification,
      children: classification.children.map((entry) => {
        return this.getTreeNode(entry);
      }),
    };
  }

  nodeSelect(event: TreeNodeSelectEvent) {
    let parent = event.node.parent;
    while (parent) {
      if (this.selected.indexOf(parent) < 0) {
        this.selected.push(parent);
      }
      parent = parent.parent;
    }
  }

  nodeUnselect(event: TreeNodeUnSelectEvent) {
    if (this.hasSelectedChild(event.node)) {
      this.selected.push(event.node);
    }
  }

  hasSelectedChild(node: TreeNode): boolean {
    let foundOne = false;
    this.selected.forEach((selected) => {
      let parent = selected.parent;
      while (parent && !foundOne) {
        if (parent == node) {
          foundOne = true;
        }
        parent = parent.parent;
      }
    });
    return foundOne;
  }

  submit() {
    const classifications = this.flatten(this.treeNodes);
    this.classificationService.setClassifications(classifications);
    this.dialogRef.close();
  }

  private flatten(treeNodes: TreeNode[]): Classification[] {
    const classifications: Classification[] = [];
    treeNodes.forEach((treeNode) => {
      if (this.selected.indexOf(treeNode) > -1) {
        classifications.push(treeNode.data);
      }
      if (treeNode.children) {
        classifications.push(...this.flatten(treeNode.children));
      }
    });
    return classifications;
  }
}

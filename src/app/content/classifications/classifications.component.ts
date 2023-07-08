import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TreeNodeSelectEvent, TreeNodeUnSelectEvent } from 'primeng/tree';
import { Classification } from 'src/app/model/classification';
import { ClassificationService } from 'src/app/services/classification.service';

@Component({
  selector: 'app-classifications',
  templateUrl: './classifications.component.html',
  styleUrls: ['./classifications.component.scss']
})
export class ClassificationsComponent implements OnInit{
  classUUIDs: string[];
  classifications: TreeNode[] = []
  selection:  TreeNode<any> | TreeNode<any>[] | null = null;

  constructor(config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private classificationService: ClassificationService
  ) {
    this.classUUIDs = config.data.classUUIDs
  }
  ngOnInit(): void {
    this.classificationService.getClassifications(this.classUUIDs).subscribe({
      next: (tree) => {
        console.log(tree)
        tree.forEach(entry => {
          const treeNode = this.getTreeNode(entry);
          treeNode.expanded = true;
          this.classifications.push(treeNode)
        })
      }
    })
  }

  getTreeNode(classification: Classification): TreeNode {
    return {
      label: classification.label,
      children: classification.children.map(entry => { return this.getTreeNode(entry)})
    }
  }

  nodeSelect(event:  TreeNodeSelectEvent) {
    let parent = event.node.parent
    while (parent) {
      if ((this.selection as TreeNode<any>[]).indexOf(parent) < 0) {
        (this.selection as TreeNode<any>[]).push(parent)
      }
      parent = parent.parent
    }
  }
  
  nodeUnselect(event:  TreeNodeUnSelectEvent) {
    if (this.hasSelectedChild(event.node)) {
      (this.selection as TreeNode<any>[]).push(event.node)
    }
  }

  hasSelectedChild(node: TreeNode): boolean {
    let foundOne = false;
    (this.selection as TreeNode<any>[]).forEach(selected => {
      let parent = selected.parent
      while (parent && !foundOne) {
        if (parent == node) {
          foundOne = true
        }
        parent = parent.parent
      }
    })
    return foundOne
  }
}

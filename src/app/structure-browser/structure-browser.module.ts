import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';
import { TreeTableModule } from 'primeng/treetable';

import { ColumnComponent } from './column/column.component';
import { StructureBrowserRoutingModule } from './structure-browser-routing.module';
import { StructureBrowserComponent } from './structure-browser/structure-browser.component';

@NgModule({
  imports: [StructureBrowserRoutingModule],
})
export class StructureBrowserModule {}

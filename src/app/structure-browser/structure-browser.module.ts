import { ColumnComponent } from './column/column.component';
import { StructureBrowserRoutingModule } from './structure-browser-routing.module';
import { StructureBrowserComponent } from './structure-browser/structure-browser.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  declarations: [StructureBrowserComponent, ColumnComponent],
  imports: [
    CommonModule,
    StructureBrowserRoutingModule,
    TreeTableModule,
    MenuModule,
    FormsModule,
    ButtonModule,
    MenuModule,
    MenubarModule,
    ConfirmDialogModule,
    OverlayPanelModule,
  ],
})
export class StructureBrowserModule {}

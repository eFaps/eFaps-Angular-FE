import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { TreeTableModule } from 'primeng/treetable';

import { StructureBrowserRoutingModule } from './structure-browser-routing.module';
import { StructureBrowserComponent } from './structure-browser/structure-browser.component';

@NgModule({
  declarations: [StructureBrowserComponent],
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
  ],
})
export class StructureBrowserModule {}

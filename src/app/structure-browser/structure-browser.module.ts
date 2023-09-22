import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureBrowserRoutingModule } from './structure-browser-routing.module';
import { StructureBrowserComponent } from './structure-browser/structure-browser.component';

import { TreeTableModule } from 'primeng/treetable';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    StructureBrowserComponent
  ],
  imports: [
    CommonModule,
    StructureBrowserRoutingModule,
    TreeTableModule,
    MenuModule,
    FormsModule,
    ButtonModule,
    MenuModule,
    MenubarModule,
  ]
})
export class StructureBrowserModule { }

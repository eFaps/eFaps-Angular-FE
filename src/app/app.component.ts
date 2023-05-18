import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { MenuService } from './services/menu.service';
import { MenuEntry } from './model/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'eFaps-Angular-FE';

  items: MenuItem[] = [
    {
      label: 'test',
    },
  ];
  constructor(
    private primengConfig: PrimeNGConfig,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.menuService.getMainMenu().subscribe({
      next: (items) =>(this.items = items.map(item=> this.getMenuItem(item))
        )})
    
  }

  getMenuItem(item: MenuEntry):MenuItem  {
    return {
      label: item.label,
      items: item.children.length > 0 ? item.children.map(item=> this.getMenuItem(item)) : undefined
    };
  }

}

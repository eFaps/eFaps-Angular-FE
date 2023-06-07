import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Section } from 'src/app/model/content';
import { MenuAction, MenuEntry } from 'src/app/model/menu';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  oid: string | undefined;
  tabs: MenuItem[] = [];
  mainHeader: string = '';
  sections: Section[] = [];
  activeItem: MenuItem|undefined= undefined
  showSections = true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.oid = params['oid'];
      this.contentService.getContent(this.oid!!).subscribe({
        next: (val) => {
          this.tabs = val.nav.map((item, index) =>
            this.getMenuItem(item, index)
          );
          this.activeItem = this.tabs[0]
          this.mainHeader = val.outline.header;
          this.sections = val.outline.sections;
        },
      });
    });
  }

  getMenuItem(item: MenuEntry, index: number): MenuItem {
    return {
      id: item.id,
      label: item.label,
      routerLink:
        index == 0 ? undefined : this.evalRouterLink(item),
      command:  index == 0 ? (event) =>{ this.mainClick()} :  (event) =>{ this.showSections = false },
      queryParams:  index == 0 ? undefined : { oid: this.oid }

    };
  }

  evalRouterLink(item: MenuEntry): any | undefined {
    if (item.action && item.action.type == 'GRID') {
      return [{ outlets: { contentOutlet: ['table', item.id] } }];
    }
    return undefined;
  }

  mainClick() {
    this.router.navigate(["../../content", this.oid])
    this.showSections = true
  }

  
}

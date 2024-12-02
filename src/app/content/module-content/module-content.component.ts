import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIModule } from 'src/app/model/module';
import { ContentService } from 'src/app/services/content.service';
import { DynamicComponentService } from 'src/app/services/dynamic-component.service';

@Component({
  selector: 'app-module-content',
  standalone: true,
  imports: [],
  templateUrl: './module-content.component.html',
  styleUrl: './module-content.component.scss'
})
export class ModuleContentComponent implements AfterViewInit {
  module: UIModule | undefined;

  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  vcr!: ViewContainerRef;

  constructor(private router: Router,
    private dynamicComponentService: DynamicComponentService) {
    let state = this.router.getCurrentNavigation()?.extras.state
    if (state) {
      this.module = state["module"]
    }

  }

  ngAfterViewInit(): void {
    if (this.module) {
      this.vcr.clear();
      this.dynamicComponentService.loadUIModule(
        this.vcr,
        this.module,
        {
          oid: undefined,
          parentOid: undefined
        }
      );
    }
  }
}

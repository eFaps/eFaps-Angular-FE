import { Component, Input } from '@angular/core';
import { Page } from 'src/app/model/dashboard';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  @Input()
  page: Page | undefined;
}

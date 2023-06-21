import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-chooser',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './theme-chooser.component.html',
  styleUrls: ['./theme-chooser.component.scss'],
})
export class ThemeChooserComponent {
  constructor(private themeService: ThemeService) {}

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }
}

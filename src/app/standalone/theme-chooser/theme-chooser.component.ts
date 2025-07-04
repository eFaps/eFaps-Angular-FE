import { Component, inject, linkedSignal, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { Theme, ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-chooser',
  imports: [ButtonModule, TooltipModule],
  templateUrl: './theme-chooser.component.html',
  styleUrls: ['./theme-chooser.component.scss'],
})
export class ThemeChooserComponent {
  private readonly themeService = inject(ThemeService);

  colors = this.themeService.colors;

  icon = linkedSignal<string>(() => {
    const theme = this.themeService.theme();
    return theme.darkMode ? 'pi pi-sun' : 'pi pi-moon';
  });

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  updateColor(color: string) {
    this.themeService.updateColor(color);
  }
}

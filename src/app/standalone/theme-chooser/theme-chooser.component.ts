import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@efaps/ngx-store';
import { updatePrimaryPalette } from '@primeng/themes';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-theme-chooser',
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './theme-chooser.component.html',
  styleUrls: ['./theme-chooser.component.scss'],
})
export class ThemeChooserComponent implements OnInit {
  icon: string = 'pi pi-sun';

  @LocalStorage() palette: string | undefined;

  constructor() {}

  ngOnInit(): void {
    const element = document.querySelector('html');
    if (element) {
      if (element.classList.contains('dark-mode')) {
        this.icon = 'pi pi-sun';
      } else {
        this.icon = 'pi pi-moon';
      }
    }
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('dark-mode');
      if (element.classList.contains('dark-mode')) {
        this.icon = 'pi pi-sun';
      } else {
        this.icon = 'pi pi-moon';
      }
    }
  }

  updateColor(color: string) {
    this.palette = color;
    updatePrimaryPalette({
      50: `{${color}.50}`,
      100: `{${color}.100}`,
      200: `{${color}.200}`,
      300: `{${color}.300}`,
      400: `{${color}.400}`,
      500: `{${color}.500}`,
      600: `{${color}.600}`,
      700: `{${color}.700}`,
      800: `{${color}.800}`,
      900: `{${color}.900}`,
      950: `{${color}.950}`,
    });
  }
}

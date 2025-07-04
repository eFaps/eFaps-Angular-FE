import { effect, inject, Injectable, signal } from '@angular/core';
import { updatePrimaryPalette } from '@primeuix/themes';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageService = inject(LocalStorageService);
  private storedTheme = this.storageService.get<Theme>('theme');

  theme = signal<Theme>(
    this.storedTheme
      ? this.storedTheme
      : {
          color: 'indigo',
          darkMode: false,
        },
  );

  constructor() {
    effect(() => {
      const theme = this.theme();
      this.updatePrimaryPalette(theme.color);
      this.setDarkMode(theme.darkMode);
      this.storageService.set('theme', theme);
    });
  }

  init() {}

  updateColor(color: string) {
    this.theme.update((theme) => {
      return {
        color: color,
        darkMode: theme.darkMode,
      };
    });
  }

  toggleDarkMode() {
    this.theme.update((theme) => {
      return {
        color: theme.color,
        darkMode: !theme.darkMode,
      };
    });
  }

  private updatePrimaryPalette(color: string) {
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

  private setDarkMode(darkMode: boolean) {
    const element = document.querySelector('html');
    if (element) {
      if (darkMode) {
        element.classList.add('dark-mode');
      } else {
        element.classList.remove('dark-mode');
      }
    }
  }
}
export interface Theme {
  color: string;
  darkMode: boolean;
}

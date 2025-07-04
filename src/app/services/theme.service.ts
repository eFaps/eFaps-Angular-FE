import { effect, inject, Injectable, signal } from '@angular/core';
import { Theme, updatePrimaryPalette } from '@primeuix/themes';
import { primitive } from '@primeuix/themes/material/base';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageService = inject(LocalStorageService);
  private storedTheme = this.storageService.get<Theme>('theme');

  colors: { name: string, color: string }[] = []

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
    this.init()
  }

  init() {
    this.colors = []
    Object.keys(primitive).forEach(key => {

      const attr = (primitive as any)[key]
      if (attr.hasOwnProperty('500')) {
        console.log(key)
        this.colors.push({
          name: key,
          color: attr['500']
        })
      }
    })


  }

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
    updatePrimaryPalette((primitive as any)[color])
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

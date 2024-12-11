import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class ThemeChooserComponent implements OnInit {
  icon: string = 'pi pi-sun';

  constructor(private themeService: ThemeService) {}

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
}

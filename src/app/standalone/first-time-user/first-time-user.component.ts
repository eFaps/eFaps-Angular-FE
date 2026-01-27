import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-first-time-user',
  imports: [],
  templateUrl: './first-time-user.component.html',
  styleUrl: './first-time-user.component.scss',
})
export class FirstTimeUserComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.firstTimeUser().subscribe({
      next: (_) => {
        this.router.navigate(['']);
      },
    });
  }
}

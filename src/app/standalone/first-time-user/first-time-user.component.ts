import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-first-time-user',
  standalone: true,
  imports: [],
  templateUrl: './first-time-user.component.html',
  styleUrl: './first-time-user.component.scss'
})
export class FirstTimeUserComponent implements OnInit {
constructor(private router: Router, private userService: UserService) {
  
}

  ngOnInit(): void {
    this.userService.firstTimeUser().subscribe({
      next: (_) => {
        this.router.navigate([''])
      }
    })
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../core/services/auth-user-service';

@Component({
  selector: 'app-home-list',
  imports: [],
  templateUrl: './home-list.html',
  styleUrl: './home-list.scss',
})
export class HomeList {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthUserService);

  onLogOut() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}

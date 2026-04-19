import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthUserService } from '../../core/services/auth-user-service';
import { SvgIcons } from '../svg-icons/svg-icons';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, SvgIcons, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthUserService);
  public isActive = false;

  public toggleMenu() {
    this.isActive = !this.isActive;
  }

  public onLogOut() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}

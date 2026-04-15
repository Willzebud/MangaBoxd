import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthUserService } from '../../core/services/auth-user-service';
import { SvgIcons } from "../svg-icons/svg-icons";

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    SvgIcons
],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthUserService);

  onLogOut() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}

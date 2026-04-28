import { Component, inject, input } from '@angular/core';
import { SvgIcons } from '../svg-icons/svg-icons';
import { AuthUserService } from '../../core/services/auth-user-service';

@Component({
  selector: 'app-action-bar-profil',
  imports: [],
  templateUrl: './action-bar-profil.html',
  styleUrl: './action-bar-profil.scss',
})
export class ActionBarProfil {
  public readonly userName = input.required<string>()
}

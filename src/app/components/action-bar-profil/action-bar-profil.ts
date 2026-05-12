import { Component, computed, inject, input, output, signal } from '@angular/core';
import { SvgIcons } from '../svg-icons/svg-icons';
import { AuthUserService } from '../../core/services/auth-user-service';
import { AuthStore } from '../../core/stores/auth/auth.store';
import { ProfilView } from '../../core/type/profil-type';

@Component({
  selector: 'app-action-bar-profil',
  imports: [],
  templateUrl: './action-bar-profil.html',
  styleUrl: './action-bar-profil.scss',
})
export class ActionBarProfil {
  //public readonly userName = input.required<string>()
  private readonly authStore = inject(AuthStore)
  public readonly userName = computed(() => this.authStore.user()?.firstname)
  public readonly profilOrFav= input.required<ProfilView>();
  public readonly changeView = output<ProfilView>();

  public changeProfil(): void {
    this.changeView.emit('profil')
  }

  public changeFavorite(): void {
    this.changeView.emit('favorites')
  }

}

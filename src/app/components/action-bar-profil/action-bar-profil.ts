import { Component, computed, inject, input } from '@angular/core';
import { SvgIcons } from '../svg-icons/svg-icons';
import { AuthUserService } from '../../core/services/auth-user-service';
import { AuthStore } from '../../core/stores/auth/auth.store';

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

  constructor(){
    console.log("TESSSST", this.authStore.user()?.firstname)
  }
}

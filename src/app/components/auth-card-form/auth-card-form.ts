import {
  Component,
  input,
  computed,
  inject,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { FieldTree, FormField } from '@angular/forms/signals';
import { AuthModel } from '../../core/models/auth-user-models';

@Component({
  selector: 'app-auth-card-form',
  imports: [FormField],
  templateUrl: './auth-card-form.html',
  styleUrl: './auth-card-form.scss',
})
export class AuthCardForm {
  public cardTitle = input.required<string>();
  public cardLoginOrRegisterText = input.required<string>();
  public linkToRegisterOrLogin = input.required<string>();
  public btnText = input.required<string>();
  public route = input.required<string>();
  public currentType = input.required<string>();
  public isSubmitting = input.required<boolean>();
  public onSubmit: OutputEmitterRef<void> = output();
  public authForm = input.required<FieldTree<AuthModel>>();

  private readonly router = inject(Router);

  public readonly isRegisterScreen = computed<boolean>(() => this.currentType() === 'Register');

  public onNavigateToLoginOrRegister(): void {
    this.router.navigateByUrl(this.route());
  }

  public onClick(): void {
    this.onSubmit.emit();
  }
}

import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCardForm } from '../components/auth-card-form/auth-card-form';
import { AuthUserService } from '../core/services/auth-user-service';
import { form, required } from '@angular/forms/signals';
import { AuthModel } from '../core/models/auth-user-models';

@Component({
  selector: 'app-login',
  imports: [AuthCardForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public readonly isSubmitting = signal(false);

  private readonly router = inject(Router);
  private readonly authService = inject(AuthUserService);

  private readonly loginModel = signal<AuthModel>({
    emailId: '',
    password: '',
  });

  private readonly errorMessage = signal<string | null>(null);

  public loginForm = form(this.loginModel, (path) => {
    required(path.emailId, { message: 'Email is required' });
    required(path.password, { message: 'Passwod is required' });
  });

  onNavigateToRegister(): void {
    this.router.navigateByUrl('register');
  }

  public onSubmitLogin(): void {
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.authService.loginUser(this.loginModel()).subscribe({
      next: (response) => {
        alert('User login success');
        this.isSubmitting.set(false);
        this.router.navigate(['/homelist']);
      },
      error: () => {
        this.errorMessage.set('Échec de la connexion');
        this.isSubmitting.set(false);
      },
    });
  }
}

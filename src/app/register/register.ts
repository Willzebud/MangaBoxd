import { Component, inject, signal } from '@angular/core';
import { AuthCardForm } from '../components/auth-card-form/auth-card-form';
import { AuthUserService } from '../core/services/auth-user-service';
import { Router } from '@angular/router';
import { AuthModel } from '../core/models/auth-user-models';
import { email, form, minLength, pattern, required } from '@angular/forms/signals';

@Component({
  selector: 'app-register',
  imports: [AuthCardForm],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  public readonly isSubmitting = signal(false);

  private readonly router = inject(Router);
  private readonly authService = inject(AuthUserService);

  private readonly passwordRegex = signal(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/,
  );

  private readonly registerModel = signal<AuthModel>({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    role: 'USER',
    
  });

  private readonly errorMessage = signal<string | null>(null);

  public registerForm = form(this.registerModel, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Enter a valid email adress' });

    required(path.firstname!, { message: 'Firstname is required' });
    required(path.lastname!, { message: 'Lastname required'});

    required(path.password, { message: 'Password is required' });
    pattern(path.password, this.passwordRegex, {
      message:
        'The password must contain an uppercase and lowercase letter, a special character, and be at least 8 characters long.',
    })
  });

  public onSubmitRegister(): void {
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.authService.registerUser(this.registerModel()).subscribe({
      next: (response) => {
        alert('User register success');
        this.isSubmitting.set(false);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage.set('Login failed');
        this.isSubmitting.set(false);
      },
    });
  }
}

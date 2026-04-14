import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthCardForm } from '../components/auth-card-form/auth-card-form';
import { AuthUserService } from '../core/services/auth-user-service';

@Component({
  selector: 'app-login',
  imports: [AuthCardForm, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public readonly isSubmitting = signal(false);

  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthUserService);

  public loginForm: FormGroup = this.formBuilder.group({
    emailId: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onNavigateToRegister(): void {
    this.router.navigateByUrl('register');
  }

  public onSubmitLogin(): void {
    this.isSubmitting.set(true);

    this.authService.loginUser(this.loginForm.value).subscribe(
      (res) => {
        alert('User login success');
        this.isSubmitting.set(false);
        this.loginForm.reset();
        this.router.navigate(['/homelist']);
      },
      (error) => {
        alert(error);
        this.isSubmitting.set(false);
      },
    );
  }
}

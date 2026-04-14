import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthCardForm } from '../components/auth-card-form/auth-card-form';
import { AuthUserService } from '../core/services/auth-user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [AuthCardForm, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  public readonly isSubmitting = signal(false);

  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthUserService);

  private readonly passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;

  public registerForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(4)]],
    emailId: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
  });

  public onSubmitRegister(): void {
    console.log('Register form value:', JSON.stringify(this.registerForm.value));
    this.isSubmitting.set(true);

    this.authService.registerUser(this.registerForm.value).subscribe(
      (res) => {
        console.log('Register response:', res);
        alert('User register success');
        this.isSubmitting.set(false);
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      (error) => {
        alert(error.error);
        this.isSubmitting.set(false);
      },
    );
  }
}

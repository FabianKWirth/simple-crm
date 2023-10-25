import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FirebaseAuth } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string;
  password: string;

  form: FormGroup;

  constructor(public auth: FirebaseAuth, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator()]]
    });
  }


  submit() {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      this.auth.register(email, password);
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (!value) {
        return null; // If no value is provided, don't perform validation.
      }

      const hasNumber = /[0-9]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasUppercase = /[A-Z]/.test(value);

      const isValid = hasNumber && hasLowercase && hasUppercase;

      return isValid ? null : { passwordRequirements: true };
    };
  }
  
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}

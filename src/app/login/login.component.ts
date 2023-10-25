import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuth } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  form: FormGroup;

  constructor(public auth: FirebaseAuth, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      this.auth.login(email, password);
    }
  }

  guestLogin() {
    const email = "guest@guest.de";
    const password = "guestpassword";
    this.auth.login(email, password);
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseAuth } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  constructor(public auth: FirebaseAuth) {

  }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  submit() {
    console.log("login");
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      this.auth.login(email, password);
    }
  }

  guestLogin() {
    console.log("guest Login");
    const email = "guest@guest.de";
    const password = "guestpassword";
    this.auth.login(email, password);

  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}

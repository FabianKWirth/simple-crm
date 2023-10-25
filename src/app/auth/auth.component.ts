import { Component } from '@angular/core';
import { FirebaseAuth } from 'src/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email: string;
  password: string;

  constructor(public auth: FirebaseAuth){

  }
}

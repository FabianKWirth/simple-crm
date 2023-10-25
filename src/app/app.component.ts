import { Component } from '@angular/core';
import { FirebaseAuth } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-crm';

  constructor(public firebaseAuth: FirebaseAuth){
    
  }

}

import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FirebaseAuth } from 'src/services/auth.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-crm';
  opened: boolean = true;
  @ViewChild('drawer') drawer: MatDrawer;

  clientScreenWidth: number;


  constructor(public firebaseAuth: FirebaseAuth, private router: Router, public notificationService: NotificationService) {
    this.clientScreenWidth = window.innerWidth;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.clientScreenWidth = event.target.innerWidth;
  }

  goto(route: string): void {
    if (this.clientScreenWidth <= 700) {
      this.drawer.toggle();
    }

    this.router.navigate([route]);
  }

}

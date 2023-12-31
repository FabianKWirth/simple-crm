import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { DealsComponent } from './deals/deals.component';
import { DialogAddDealComponent } from './dialog-add-deal/dialog-add-deal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogEditDealComponent } from './dialog-edit-deal/dialog-edit-deal.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UserCountComponent } from './user-count/user-count.component';
import { BiggestDealsComponent } from './biggest-deals/biggest-deals.component';
import { TotalDealsVolumeComponent } from './total-deals-volume/total-deals-volume.component';
import { TotalClosedWonDealsVolumeComponent } from './total-closed-won-deals-volume/total-closed-won-deals-volume.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { DealStatusChartComponent } from './deal-status-chart/deal-status-chart.component';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SystemMessageComponent } from './system-message/system-message.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    DialogAddUserComponent,
    UserDetailComponent,
    DialogEditAddressComponent,
    DialogEditUserComponent,
    DealsComponent,
    DialogAddDealComponent,
    DialogEditDealComponent,
    NewsFeedComponent,
    UserCountComponent,
    BiggestDealsComponent,
    TotalDealsVolumeComponent,
    TotalClosedWonDealsVolumeComponent,
    LegalNoticeComponent,
    DealStatusChartComponent,
    LoginComponent,
    RegisterComponent,
    SystemMessageComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [
    ScreenTrackingService, UserTrackingService, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

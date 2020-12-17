import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ManagerResponseComponent } from './manager-response/manager-response.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsComponent } from './notifications/notifications.component';
import { Errorpage404Component } from './errorpage404/errorpage404.component';
import { routes } from './routes';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DataSharingService } from './services/dataSharing/data-sharing.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ManagerResponseComponent,
    NotificationsComponent,
    Errorpage404Component,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    DataSharingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SupplierTenderComponent } from './supplier-tender/supplier-tender.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Errorpage404Component } from './errorpage404/errorpage404.component';

import {routes} from '../app/routes';
import { SupplierResponseComponent } from './supplier-response/supplier-response.component';
import { HospitalResponseComponent } from './hospital-response/hospital-response.component';
import { HospitalsResponseComponent } from './hospitals-response/hospitals-response.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    SupplierTenderComponent,
    LoginComponent,
    RegisterComponent,
    Errorpage404Component,
    SupplierResponseComponent,
    HospitalResponseComponent,
    HospitalsResponseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {Routes} from '@angular/router';
import { Errorpage404Component } from './errorpage404/errorpage404.component';
import { HomeComponent } from './home/home.component';
import { HospitalsResponseComponent } from './hospitals-response/hospitals-response.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SupplierResponseComponent } from './supplier-response/supplier-response.component';
import { SupplierTenderComponent } from './supplier-tender/supplier-tender.component';
import { HospitalResponseComponent } from './hospital-response/hospital-response.component';

export const routes: Routes = [
    {path:"login",component: LoginComponent},
    {path:"register",component: RegisterComponent},
    {path:"home", component: HomeComponent},
    {path:"hospital_message/:id", component:SupplierTenderComponent},
    {path:"supplier_response/:id", component:SupplierResponseComponent},
    {path:"hospitals_response", component:HospitalsResponseComponent},
    {path:"hospital_response", component: HospitalResponseComponent},
    {path:"**", component: Errorpage404Component}
]
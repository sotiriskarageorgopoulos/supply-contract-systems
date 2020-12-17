import {Routes} from "@angular/router";
import { Errorpage404Component } from "./errorpage404/errorpage404.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ManagerResponseComponent } from "./manager-response/manager-response.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { RegisterComponent } from "./register/register.component";

export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"home", component: HomeComponent},
    {path:"notifications", component:NotificationsComponent},
    {path:"notification/:id", component:ManagerResponseComponent},
    {path:"**", component:Errorpage404Component}
]
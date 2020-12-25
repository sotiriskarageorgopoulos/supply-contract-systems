import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { Clerk } from '../model/clerk';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private ds:DataSharingService, private ls:LoginService, 
    private router:Router) {
    this.ds.setNameOfComponent(this.constructor.name);
    this.createLoginForm();
   }

  loginForm: FormGroup;
  isAuthorized: boolean = false;
  clerkInfo: Clerk;

  ngOnInit(): void {
     
  }

  onSubmitLoginForm(): void {
    if(this.loginForm.valid) { 
       this.ls.getClerkInfoByEmail(this.loginForm.value.email)
      .subscribe(clerkInfo => this.clerkInfo = (clerkInfo as Clerk));
      this.ls
      .authentication(this.loginForm)
      .subscribe(res => {
         this.isAuthorized = res["authorized"];
         console.log(this.isAuthorized);
         if(this.isAuthorized){ 
            console.log(this.clerkInfo);
            sessionStorage.setItem('personId', this.clerkInfo.person.personId);
            sessionStorage.setItem('personName', this.clerkInfo.person.personName);
            sessionStorage.setItem('personSurname', this.clerkInfo.person.personSurname);
            sessionStorage.setItem('personOtherName', this.clerkInfo.person.personOtherName);
            sessionStorage.setItem('personJobTitle', this.clerkInfo.person.personJobTitle);
            this.router.navigate(['/home']);
            this.loginForm.reset();
         }
         else{
          this.loginForm.reset();
          this.ngOnInit();
         }
      });
    }
  } 

  createLoginForm(): void {
     this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
}

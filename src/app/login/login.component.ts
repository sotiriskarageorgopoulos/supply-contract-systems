import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private ds:DataSharingService, private ls:LoginService, 
    private router:Router) {
    this.ds.setNameOfComponent(this.constructor.name);
   }

  loginForm: FormGroup;
  ngOnInit(): void {
    this.createLoginForm();
  }

  onSubmitLoginForm(): void {
    if(this.loginForm.valid) {
      this.ls
      .authentication(this.loginForm)
      .subscribe(res => {
         let isAuthorized = res["authorized"];
         if(isAuthorized){
          this.ds.setEmailOfClerk(this.loginForm.value.email);
          this.router.navigate(['/home']);
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

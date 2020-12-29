import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { LoginService } from  '../services/loginService/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { SupplierInfo } from '../model/supplierInfo';

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
    supplierInfo: SupplierInfo;

  ngOnInit(): void {
  }

  onSubmitLoginForm(): void {
    if(this.loginForm.valid) { 
       this.ls.getSupplierInfoByEmail(this.loginForm.value.email)
      .subscribe(supplierInfo => this.supplierInfo = (supplierInfo as SupplierInfo));
      this.ls
      .authentication(this.loginForm)
      .subscribe(res => {
         this.isAuthorized = res["authorized"];
         console.log(this.isAuthorized);
         if(this.isAuthorized){ 
            console.log(this.supplierInfo);
            sessionStorage.setItem('supplierId', this.supplierInfo.supplier.id);
            sessionStorage.setItem('supplierLabel', this.supplierInfo.supplier.label);
            sessionStorage.setItem('supplierEmail', this.supplierInfo.supplier.email);
            sessionStorage.setItem('supplierAddress', this.supplierInfo.supplier.address);
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

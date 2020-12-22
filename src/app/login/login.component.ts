import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private ds:DataSharingService) {
    this.ds.setNameOfComponent(this.constructor.name);
   }

  loginForm: FormGroup;
  ngOnInit(): void {
    this.createLoginForm();
  }
  
  createLoginForm(): void {
     this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
}

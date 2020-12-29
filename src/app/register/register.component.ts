import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { RegisterService } from '../services/registerService/register.service';
import { FormGroup, FormControl} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private ds:DataSharingService, private rs:RegisterService) { 
    this.ds.setNameOfComponent(this.constructor.name);
  }

  registerForm: FormGroup;
  supplier: FormGroup;

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.supplier = new FormGroup({
      id: new FormControl(uuidv4()),
      label: new FormControl(),
      email: new FormControl(),
      address: new FormControl()
    });

    this.registerForm = new FormGroup({
      supplier: this.supplier,
      password: new FormControl()
    });
  }

  onSubmitRegisterForm(): void {
    if(this.registerForm.valid) {
      this.rs
          .register(this.registerForm)
          .subscribe()
      this.registerForm.reset();
      this.ngOnInit();
    }
  }

}

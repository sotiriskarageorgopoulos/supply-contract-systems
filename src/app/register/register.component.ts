import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { RegisterService } from '../services/register/register.service';
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
  person: FormGroup;
  hospitals;

  ngOnInit(): void {
    this.createRegisterForm();
    this.getHospitals();
  }

  createRegisterForm(): void {
    this.person = new FormGroup({
      personId: new FormControl(uuidv4()),
      personName: new FormControl(),
      personSurname: new FormControl(),
      personOtherName: new FormControl(''),
      personJobTitle: new FormControl(),
    });

    this.registerForm = new FormGroup({
      person: this.person,
      email: new FormControl(),
      password: new FormControl(),
      hospitalLabel: new FormControl()
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

  getHospitals(): void {
    this.rs.getHospitals().subscribe(h => this.hospitals = h);
  }
}

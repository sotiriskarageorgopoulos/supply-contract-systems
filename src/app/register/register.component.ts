import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private ds:DataSharingService) { 
    this.ds.setNameOfComponent(this.constructor.name);
  }

  registerForm: FormGroup;

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      othername: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      jobTitle: new FormControl(),
      hospital: new FormControl()
    })
  }

}

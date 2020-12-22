import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private ds:DataSharingService) { 
    this.ds.setNameOfComponent(this.constructor.name);
  }

  personDetailsForm: FormGroup;
  hospitalDetailsForm: FormGroup;
  reqForm: FormGroup;
  tenderDurationForm: FormGroup;

  ngOnInit(): void {
    this.createPersonDetailsForm();
    this.createHospitalDetailsForm();
    this.createRequirementForm();
    this.createTenderDurationForm();
  }

  createPersonDetailsForm(): void {
    this.personDetailsForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      othername: new FormControl(),
      jobTitle: new FormControl()
    })
  }

  createHospitalDetailsForm(): void {
    this.hospitalDetailsForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      address: new FormControl()
    })
  }

  createRequirementForm(): void {
    this.reqForm = new FormGroup({
      requirements: new FormControl(this.getRequirements())
    })
  }

  createTenderDurationForm(): void {
    this.tenderDurationForm = new FormGroup({
      startDateTime: new FormControl(),
      endDateTime: new FormControl()
    })
  }

  getRequirements(): String[] {
    let inputs = document.getElementsByTagName("input");
    let requirements = [];
    for(let i=0;i<inputs.length;i++){
      if(inputs[i].name === 'req') requirements.push(inputs[i].value);
    }
    return requirements;
  }

  createNewReqInputs(): void {
    let divElement = document.getElementById("reqInputs");
    let divElementBtn = document.getElementById("rmBtn");
    let label = document.createElement("label");
    label.htmlFor = "req";
    label.innerText = "Requirement: ";
    let div = document.createElement("div")
    div.classList.add("form-group");
    let input = document.createElement("input");
    input.type = "text";
    input.name = "req";
    input.id = "req";
    input.required = true;
    input.classList.add("form-control");
    divElement.appendChild(div);
    div.appendChild(label);
    div.appendChild(input);
    if(divElement.childNodes.length === 1){
      let rmBtn = this.createRmBtn();
      divElementBtn.appendChild(rmBtn);
    }
  }

  createRmBtn(): HTMLElement {
    let rmBtn = document.createElement("button");
    rmBtn.type = "button";
    rmBtn.classList.add("btn");
    rmBtn.classList.add("btn-sm");
    rmBtn.classList.add("req-rm-btn");
    rmBtn.classList.add("btn-danger");
    rmBtn.classList.add("mb-2");
    rmBtn.classList.add("mt-2");
    rmBtn.onclick = this.removeNewReqInputs;
    rmBtn.innerText = "Remove Requirement";
    return rmBtn;
  }

  removeNewReqInputs(): void {
    let divElementBtn = document.getElementById("rmBtn");
    let divElementReqs = document.getElementById("reqInputs");
    divElementReqs.removeChild(divElementReqs.lastChild);
    if(divElementReqs.childNodes.length === 0) divElementBtn.innerHTML = '';
  }
}

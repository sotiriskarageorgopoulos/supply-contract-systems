import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { HomeService } from '../services/home/home.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from '../model/person';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  person: FormGroup;
  hospital: FormGroup;
  tenderRequirements: FormGroup;
  tenderDuration: FormGroup;
  personObj: Person;
  requirements;
  numberOfTenders;

  constructor(private ds:DataSharingService, private hs:HomeService) { 
    this.ds.setNameOfComponent(this.constructor.name);
    this.personObj = this.createPersonObj();
    console.log(this.numberOfTenders);
    console.log(this.personObj);
  }

  ngOnInit(): void {
    this.createPersonDetailsForm();
    this.createHospitalDetailsForm();
    this.createRequirementForm();
    this.createTenderDurationForm();
    console.log(this.numberOfTenders)
  }

  createPersonObj():Person {
    return {
        _id: null,
        personId: sessionStorage.getItem('personId'),
        personName: sessionStorage.getItem('personName'),
        personSurname: sessionStorage.getItem('personSurname'),
        personOtherName: sessionStorage.getItem('personOtherName'),
        personJobTitle: sessionStorage.getItem('personJobTitle')
    }
  }

  createPersonDetailsForm(): void {
    this.person = new FormGroup({
      personId: new FormControl(this.personObj.personId),
      personName: new FormControl(this.personObj.personName),
      personSurname: new FormControl(this.personObj.personSurname),
      personOthername: new FormControl(this.personObj.personOtherName),
      personJobTitle: new FormControl(this.personObj.personJobTitle)
    })
  }

  createHospitalDetailsForm(): void {
    this.hospital = new FormGroup({
      id: new FormControl(),
      label: new FormControl(),
      email: new FormControl(),
      address: new FormControl()
    })
  }

  createRequirementForm(): void {
    this.tenderRequirements = new FormGroup({});
  }

  createTenderDurationForm(): void {
    this.tenderDuration = new FormGroup({
      startDateTime: new FormControl(),
      endDateTime: new FormControl()
    })
  }

  getRequirements(): void {
    let inputs = document.getElementsByTagName("input");
    let requirements:String[] = [];
    for(let i=0;i<inputs.length;i++){
      if(inputs[i].name === 'req') {
        requirements.push(inputs[i].value);
        inputs[i].readOnly = true;
      }
    }
    this.requirements = requirements;
  }

  onSubmitPersonForm(): void {
    this.readOnlyInputs("personId");
    this.readOnlyInputs("name");
    this.readOnlyInputs("surname");
    this.readOnlyInputs("othername");
    this.readOnlyInputs("jobtitle");
  }
  onSubmitHospitalForm(): void {
    this.readOnlyInputs("hospitalId");
    this.readOnlyInputs("label");
    this.readOnlyInputs("email");
    this.readOnlyInputs("address");
  }
  
  onSubmitTenderDurationForm(): void {
    this.readOnlyInputs("startDateTime");
    this.readOnlyInputs("endDateTime");
    let digitalSignature = {
      signatureId: "",
      validationDateTime:"",
      signatureHash:""
    }
    let tenderAnnouncement = {
      person: this.person.value,
      hospital: this.hospital.value,
      tenderRequirements: this.requirements,
      digitalSignature: digitalSignature,
      tenderDuration: this.tenderDuration.value
    };
    console.log(tenderAnnouncement);
    this.hs.sendTenderAnnouncement(tenderAnnouncement)
    .subscribe(res => {
      window.location.href = window.location.href;
    });
  }

  readOnlyInputs(id: string) {
    (document.getElementById(id) as HTMLInputElement).readOnly = true;
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

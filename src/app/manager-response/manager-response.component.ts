import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ManagerResponseService } from '../services/manager-response/manager-response.service';
import { Tender } from '../model/tender';
import { Qualification } from '../model/qualification';
import { Evidence } from '../model/evidence';

@Component({
  selector: 'app-manager-response',
  templateUrl: './manager-response.component.html',
  styleUrls: ['./manager-response.component.scss']
})
export class ManagerResponseComponent implements OnInit {

  counter: number = 0;
  responseForm: FormGroup;
  tender: Tender;
  qualifications: Qualification[];
  tenderId: string;
  evidences: Evidence[];
  evidenceList: Evidence[];
  hospital: FormGroup;

  constructor(private ds:DataSharingService,private route:ActivatedRoute,private mrs:ManagerResponseService) { 
    this.ds.setNameOfComponent(this.constructor.name);
    this.tenderId = this.route.snapshot.params['id'];
    this.getTender();
    this.createResponseForm();
    this.createHospitalForm();
  }

  ngOnInit(): void {}

  getTender() {
    this.mrs.getTender(this.tenderId).subscribe(t =>{
    this.tender = t;
    this.qualifications = this.tender.qualifications;
    this.evidences = this.tender.evidences;
    this.tender.qualifications.map(q => {
      this.tender.evidences.map(e => {
        if(q.evidenceId === e.evidenceId){
          this.evidenceList.push({evidenceId:e.evidenceId,description:e.description});
        }
      });
    });
    }); 
  }

  createResponseForm(): void {
    this.responseForm = new FormGroup({
      decision: new FormControl(),
    });
  }

  getExclusionReason(): String {
     if(document.getElementsByTagName("textarea")[0] !== undefined)
     return (document.getElementsByTagName("textarea")[0] as HTMLTextAreaElement).value;
  }

  showExclusionReasonInput(): void {
    if(this.counter === 0) {
      let divElement = document.getElementById("er");
      let rmDivElement = document.getElementById("rm-btn");
      let label = document.createElement("label");
      label.htmlFor = "exclusionreason";
      label.innerText = "Exclusion Reason";
      let textarea = document.createElement("textarea");
      textarea.id = "exclusionreason";
      textarea.classList.add("form-control");
      textarea.name = "exclusionreason";
      textarea.rows = 5;
      let rmBtn = document.createElement("button");
      rmBtn.classList.add("btn");
      rmBtn.classList.add("btn-sm");
      rmBtn.classList.add("btn-danger");
      rmBtn.type = "button";
      rmBtn.innerText = "Remove Exclusion Reason";
      rmBtn.id = "btn-remove-exclusion-reason";
      rmBtn.onclick = this.removeExclusionReasonInput;
      divElement.appendChild(label);
      divElement.appendChild(textarea);
      rmDivElement.appendChild(rmBtn);
    }
    document.getElementById('er').style.display = "block";
    let rmBtn = document.getElementById('btn-remove-exclusion-reason');
    rmBtn.style.display = "block";
    rmBtn.style.marginBottom = "2%";
    document.getElementById("btn-add-exclusion-reason").style.display = "none";
    this.counter++;
  }

  removeExclusionReasonInput(): void {
    document.getElementById('er').style.display = "none";
    document.getElementById('btn-remove-exclusion-reason').style.display = "none";
    document.getElementById('btn-add-exclusion-reason').style.display = "block";
  }

  onSubmitResponseForm() {
      let managerResponse = {
        hospital: this.hospital.value ,
        supplier: this.tender.supplier,
        person: this.createPersonObj(),
        qualificationResolution: this.createResponseObj(),
        digitalSignature: {
          signatureId: "",
          validationDateTime: "",
          signatureHash: ""
        }
      }
      this.mrs.postDecision(managerResponse).subscribe(res => {
        window.location.href = window.location.href;
      });
  }

  createHospitalForm() {
    this.hospital = new FormGroup({
      id: new FormControl(),
      label: new FormControl(),
      email: new FormControl(),
      address: new FormControl()
    })
  }

  onSubmitHospitalForm() {
      this.readOnlyInputs("hospitalId");
      this.readOnlyInputs("label");
      this.readOnlyInputs("email");
      this.readOnlyInputs("address");
  }

  readOnlyInputs(id: string) {
    (document.getElementById(id) as HTMLInputElement).readOnly = true;
  }

  createPersonObj() {
    return {
        _id: null,
        personId: sessionStorage.getItem('personId'),
        personName: sessionStorage.getItem('personName'),
        personSurname: sessionStorage.getItem('personSurname'),
        personOtherName: sessionStorage.getItem('personOtherName'),
        personJobTitle: sessionStorage.getItem('personJobTitle')
    }
  }

  createResponseObj() {
    return {
      exlcusionReasonDesc: this.getExclusionReason(),
      decision: Boolean(this.responseForm.value.decision),
      decisionDate: new Date().toISOString()
    }
  }
}

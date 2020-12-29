import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { SupplierResponseService } from '../services/supplierResponse/supplier-response.service'; 

@Component({
  selector: 'app-supplier-response',
  templateUrl: './supplier-response.component.html',
  styleUrls: ['./supplier-response.component.scss']
})
export class SupplierResponseComponent implements OnInit {

  qualificationForm: FormGroup = new FormGroup({});
  evidenceForm: FormGroup = new FormGroup({});
  qualifications;
  evidences;


  constructor(private ds:DataSharingService, private srs: SupplierResponseService ) {
    this.ds.setNameOfComponent(this.constructor.name);
   }

  ngOnInit(): void {}


  createNewEvidences(): void {
    let divElement = document.getElementById("evidenceInputs");
    let divElementBtn = document.getElementById("rmBtn1");
    let evidenceIdLabel = this.createLabel("id","ID");
    let descLabel = this.createLabel("desc","Description");
    let evidenceIdInput = this.createInput("eid");
    let descInput = this.createInput("desc");
    let div = document.createElement("div");
    divElement.appendChild(div);
    div.appendChild(evidenceIdLabel);
    div.appendChild(descLabel);
    evidenceIdLabel.appendChild(evidenceIdInput);
    descLabel.appendChild(descInput);
    descLabel.style.marginLeft = "2%";
    if(divElement.childNodes.length === 1){
      let rmBtn = this.createRmBtn("Remove Evidence");
      divElementBtn.appendChild(rmBtn);
    }
  }

  onSubmit() {
    let supplier = {
     id: sessionStorage.getItem('supplierId'),
     label: sessionStorage.getItem('supplierLabel'),
     email: sessionStorage.getItem('supplierEmail'),
     address: sessionStorage.getItem('supplierAddress'),
    }
    let tender = {
      supplier: supplier,
      qualifications: this.qualifications,
      evidences: this.evidences,
      digitalSignature: {
        signatureId:"",
        validationDateTime: "",
        signatureHash: ""
      }
    }

    this.srs.sendTender(tender).subscribe();
    this.ngOnInit();
  }

  getEvidences() {
    let inputs = document.getElementsByTagName("input");
    let divElementBtn = document.getElementById("rmBtn1");
    let addBtn = document.getElementById("addBtnEvidences");
    if(addBtn !== null) addBtn.remove();
    divElementBtn.innerHTML = '';
    let eids = [];
    let descriptions = [];
    let evidenceObj = {};
    let evidences = [];

    for(let i=0; i < inputs.length; i++) {
      if(inputs[i].name === 'eid'){
        eids.push(inputs[i].value);
        inputs[i].readOnly = true;
      }
      if(inputs[i].name === 'desc') {
        descriptions.push(inputs[i].value);
        inputs[i].readOnly = true;
      }
    }

    for(let i=0;i<eids.length;i++){
      evidenceObj["evidenceId"] = eids[i];
      evidenceObj["description"] = descriptions[i];
      evidences.push(evidenceObj);
      evidenceObj = {};
    }

    let nextBtn = (document.getElementById("nextBtn") as HTMLButtonElement);
    nextBtn.type = "submit";

    this.evidences = evidences;
  }

  createNewQualInputs(): void {
    let divElement = document.getElementById("qualInputs");
    let divElementBtn = document.getElementById("rmBtn");
    let capLabel = this.createLabel("cap","Capability");
    let descLabel = this.createLabel("qualDesc","Description");
    let evidenceIdLabel = this.createLabel("qualEid","Evidence ID");
    let div = document.createElement("div");
    let capInput = this.createInput("cap");
    let descInput = this.createInput("qualDesc");
    let evidenceIdInput = this.createInput("qualEid");
    divElement.appendChild(div);
    div.appendChild(capLabel);
    div.appendChild(descLabel);
    div.appendChild(evidenceIdLabel);
    capLabel.appendChild(capInput);
    descLabel.appendChild(descInput);
    descLabel.style.marginLeft = "2%";
    evidenceIdLabel.appendChild(evidenceIdInput);
    if(divElement.childNodes.length === 1){
      let rmBtn = this.createRmBtn("Remove Qualification");
      divElementBtn.appendChild(rmBtn);
    }
  }

  createRmBtn(nameOfBtn): HTMLButtonElement {
    let rmBtn = document.createElement("button");
    rmBtn.type = "button";
    rmBtn.classList.add("btn");
    rmBtn.classList.add("btn-sm");
    rmBtn.classList.add("req-rm-btn");
    rmBtn.classList.add("btn-danger");
    rmBtn.classList.add("mb-2");
    rmBtn.classList.add("mt-2");
    if(nameOfBtn === "Remove Qualification") rmBtn.onclick = this.removeNewQualInputs;
    else rmBtn.onclick = this.removeNewEvidenceInputs;
    rmBtn.innerText = nameOfBtn;
    return rmBtn;
  }

  getQualifications() {
    let inputs = document.getElementsByTagName("input");
    let divElementBtn = document.getElementById("rmBtn");
    let addBtn = document.getElementById("addBtnQuals");
    addBtn.remove();
    divElementBtn.innerHTML = '';
    let quals = [];
    let capabilities = [];
    let descriptions = [];
    let eids = [];
    let qualObj = {};
    for(let i=0;i<inputs.length;i++){  
      if(inputs[i].name === 'cap') {
        capabilities.push(inputs[i].value);
        inputs[i].readOnly = true;
      }
      if(inputs[i].name === 'qualDesc') {
        descriptions.push(inputs[i].value);
        inputs[i].readOnly = true;
      }
      if(inputs[i].name === 'qualEid') {
        eids.push(inputs[i].value);
        inputs[i].readOnly = true;
      }
    }

    for(let i=0;i<eids.length;i++){
      qualObj["tendererCapability"] = capabilities[i];
      qualObj["description"] = descriptions[i];
      qualObj["evidenceId"] = eids[i];
      quals.push(qualObj);
      qualObj = {};
    }

    this.qualifications = quals;
  }

  removeNewQualInputs(): void  {
    let divElementBtn = document.getElementById("rmBtn");
    let divElementQuals = document.getElementById("qualInputs");
    divElementQuals.removeChild(divElementQuals.lastChild);
    if(divElementQuals.childNodes.length === 0) divElementBtn.innerHTML = '';
  }

  removeNewEvidenceInputs(): void  {
    let divElementBtn = document.getElementById("rmBtn1");
    let divElementEvidences = document.getElementById("evidenceInputs");
    divElementEvidences.removeChild(divElementEvidences.lastChild);
    if(divElementEvidences.childNodes.length === 0) divElementBtn.innerHTML = '';
  }

  createLabel(labelFor:string, labelTitle:string): HTMLLabelElement{
    let label = document.createElement("label");
    label.htmlFor = labelFor;
    label.innerText = labelTitle;
    label.classList.add("form-group");
    return label;
  }

  createInput(inputName:string): HTMLInputElement {
    let input = document.createElement("input");
    input.type = "text";
    input.name = inputName;
    input.id = inputName;
    input.required = true;
    input.classList.add("form-control");
    return input;
  }

}

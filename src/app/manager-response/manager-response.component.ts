import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';

@Component({
  selector: 'app-manager-response',
  templateUrl: './manager-response.component.html',
  styleUrls: ['./manager-response.component.scss']
})
export class ManagerResponseComponent implements OnInit {

  constructor(private ds:DataSharingService) { 
    this.ds.setNameOfComponent(this.constructor.name);
  }

  ngOnInit(): void {
  }
  counter: number = 0;

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

}

import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import {HospitalResponseService} from '../services/hospitalResponse/hospital-response.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hospitals-response',
  templateUrl: './hospitals-response.component.html',
  styleUrls: ['./hospitals-response.component.scss']
})
export class HospitalsResponseComponent implements OnInit {

  hospitalsResponses;

  constructor(private ds:DataSharingService, private hrs:HospitalResponseService, private router:Router) {
    this.ds.setNameOfComponent(this.constructor.name);
    let supplierId = sessionStorage.getItem('supplierId');
    this.getHospitalsResponse(supplierId);
   }

  ngOnInit(): void {}

  getHospitalsResponse(supplierId) {
     this.hrs
    .getHospitalsResponse(supplierId)
    .subscribe(h =>{ 
      this.hospitalsResponses = h
      console.log(this.hospitalsResponses);
    });
  }

  goToHospitalResponse() {
    this.router.navigate(['/hospital_response']);
  }
}

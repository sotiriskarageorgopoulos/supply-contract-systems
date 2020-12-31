import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import {HospitalResponseService} from '../services/hospitalResponse/hospital-response.service';

@Component({
  selector: 'app-hospital-response',
  templateUrl: './hospital-response.component.html',
  styleUrls: ['./hospital-response.component.scss']
})
export class HospitalResponseComponent implements OnInit {

  hospitalResponse;

  constructor(private ds:DataSharingService, private hrs:HospitalResponseService) {
    this.ds.setNameOfComponent(this.constructor.name);
    let supplierId = sessionStorage.getItem('supplierId');
    this.getHospitalResponse(supplierId);
   }

  ngOnInit(): void {
    console.log(this.constructor.name);
  }

  getHospitalResponse(supplierId) {
    this.hrs.getHospitalResponse(supplierId)
            .subscribe(h => {
              this.hospitalResponse = h;
              console.log(this.hospitalResponse);
    });
  }

}

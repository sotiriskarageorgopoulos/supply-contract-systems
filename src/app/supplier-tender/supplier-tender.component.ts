import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierTenderService } from '../services/supplierTenderService/supplier-tender.service';
import { CallForTender } from '../model/callForTender';

@Component({
  selector: 'app-supplier-tender',
  templateUrl: './supplier-tender.component.html',
  styleUrls: ['./supplier-tender.component.scss']
})
export class SupplierTenderComponent implements OnInit {
  hospitalId: string;
  callForTender: CallForTender;

  constructor(private sts: SupplierTenderService, private ds:DataSharingService,private route:ActivatedRoute,private router:Router) {
    this.ds.setNameOfComponent(this.constructor.name);
    this.hospitalId = this.route.snapshot.params['id'];
    this.getCallForTender();
   }

  ngOnInit(): void {
  }

  getCallForTender() {
    this.sts.getCallForTender(this.hospitalId).subscribe(cft =>{
      this.callForTender = cft;
    }); 
  }

  doATender() {
    this.router.navigate(['/supplier_response/'+this.hospitalId])
  }

}

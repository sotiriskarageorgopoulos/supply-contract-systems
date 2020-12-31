import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { HomeService } from '../services/home/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  tenders: any;

  constructor(private ds:DataSharingService,private hs:HomeService,private router:Router) {
    this.ds.setNameOfComponent(this.constructor.name);
    let hospitalLabel = (sessionStorage.getItem('hospitalLabel') as string);
    console.log(hospitalLabel);
    this.getTenders(hospitalLabel);
   }

  ngOnInit(): void {}

  getTenders(hospitalLabel) {
    return this.hs.getTenders(hospitalLabel).subscribe(t =>{
      this.tenders = t
      console.log(this.tenders);
    });
  }

  goToTender(tender) {
    this.router.navigate(['/notification/'+tender.supplier.id]);
  }

}

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
    this.getTenders();
   }

  ngOnInit(): void {}

  getTenders() {
    return this.hs.getTenders().subscribe(t =>{
      this.tenders = t
      console.log(this.tenders);
    });
  }

  goToTender(tender) {
    this.router.navigate(['/notification/'+tender.supplier.id]);
  }

}

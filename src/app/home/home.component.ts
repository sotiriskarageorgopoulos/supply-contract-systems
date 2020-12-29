import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { HomeService } from '../services/homeService/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private hs:HomeService, private ds:DataSharingService ,private router:Router) { 
    this.ds.setNameOfComponent(this.constructor.name);
    this.getCallForTenders();
  }

  callForTenders: any;

  ngOnInit(): void {
  }

  getCallForTenders() {
    return this.hs.getCallForTenders().subscribe(cft =>{
      this.callForTenders = cft
      console.log(this.callForTenders);
    });
  }

  goToTender(callForTender) {
    this.router.navigate(['/hospital_message/'+callForTender.hospital.id]);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { HomeService } from '../services/home/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  nameOfComponent: string;
  tendersNumber: number;
  tenders: any;
  hospitalLabel: string;

  constructor(private ds:DataSharingService, private hs: HomeService, private router:Router) {}

  ngOnInit(): void {
    this.hospitalLabel = (sessionStorage.getItem('hospitalLabel') as string);
    console.log(this.hospitalLabel);
    this.hs.getTenders(this.hospitalLabel).subscribe(t => {
      this.tenders = t;
      this.tendersNumber = this.tenders.length;
      console.log(this.tenders);
      console.log(this.tendersNumber);
    });
  }

  ngDoCheck(): void {
    this.nameOfComponent = this.ds.getNameOfComponent();
  }

  logOut():void {
    sessionStorage.setItem('personId', '');
    sessionStorage.setItem('personName', '');
    sessionStorage.setItem('personSurname', '');
    sessionStorage.setItem('personOtherName', '');
    sessionStorage.setItem('personJobTitle', '');
    this.router.navigate(['/login']);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { HomeService } from '../services/home/home.service';

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

  constructor(private ds:DataSharingService, private hs: HomeService) { }

  ngOnInit(): void {
    this.hs.getTenders().subscribe(t => {
      this.tenders = t;
      this.tendersNumber = this.tenders.length;
    });
  }

  ngDoCheck(): void {
    this.nameOfComponent = this.ds.getNameOfComponent();
  }

}

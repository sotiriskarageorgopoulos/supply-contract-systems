import { Component, Input, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  nameOfComponent: string;

  constructor(private ds:DataSharingService) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.nameOfComponent = this.ds.getNameOfComponent();
    console.log(this.nameOfComponent);
  }

}

import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private ds:DataSharingService) { 
    this.ds.setNameOfComponent(this.constructor.name);
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';

@Component({
  selector: 'app-manager-response',
  templateUrl: './manager-response.component.html',
  styleUrls: ['./manager-response.component.scss']
})
export class ManagerResponseComponent implements OnInit {

  constructor(private ds:DataSharingService) { 
    this.ds.setNameOfComponent(this.constructor.name);
  }

  ngOnInit(): void {
  }

}

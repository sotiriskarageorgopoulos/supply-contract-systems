import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';

@Component({
  selector: 'app-errorpage404',
  templateUrl: './errorpage404.component.html',
  styleUrls: ['./errorpage404.component.scss']
})
export class Errorpage404Component implements OnInit {

  constructor(private ds:DataSharingService) {
    this.ds.setNameOfComponent(this.constructor.name);
   }

  ngOnInit(): void {
  }

}

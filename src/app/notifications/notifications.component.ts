import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(private ds:DataSharingService) {
    this.ds.setNameOfComponent(this.constructor.name);
   }

  ngOnInit(): void {
  }

}

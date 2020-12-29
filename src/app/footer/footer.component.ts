import { Component, OnInit, Input } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input()
  nameOfComponent: string;
  year:number = new Date().getFullYear();

  constructor(private ds:DataSharingService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.nameOfComponent = this.ds.getNameOfComponent();
  }


}

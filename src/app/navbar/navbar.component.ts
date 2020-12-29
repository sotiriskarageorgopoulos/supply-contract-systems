import { Component, OnInit, Input } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  nameOfComponent: string;

  constructor(private ds:DataSharingService,private router:Router) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.nameOfComponent = this.ds.getNameOfComponent();
  }

  logOut():void {
    sessionStorage.setItem('supplierId', '');
    sessionStorage.setItem('supplierLabel', '');
    sessionStorage.setItem('supplierEmail', '');
    sessionStorage.setItem('supplierAddress', '');
    this.router.navigate(['/login']);
  }
}

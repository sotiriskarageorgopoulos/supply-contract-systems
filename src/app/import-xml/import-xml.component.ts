import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharing/data-sharing.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-import-xml',
  templateUrl: './import-xml.component.html',
  styleUrls: ['./import-xml.component.scss']
})
export class ImportXMLComponent implements OnInit {

  constructor(private ds:DataSharingService) { 
    this.ds.setNameOfComponent(this.constructor.name);
  }

  xmlImportForm:FormGroup;

  ngOnInit(): void {
    this.createXMLImportForm();
  }

  createXMLImportForm(): void {
    this.xmlImportForm = new FormGroup({
      xmlFile: new FormControl()
    })
  }
}

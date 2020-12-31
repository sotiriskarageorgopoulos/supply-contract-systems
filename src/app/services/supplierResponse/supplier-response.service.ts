import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierResponseService {

  constructor(private http:HttpClient) { }
  SEND_TENDER_PATH = "/api/send_tender";
  HOSPITAL_PATH = "/api/hospital/";

  sendTender(tender) {
    const headers = new HttpHeaders()
                    .set("content-type","application/json");
    return this.http.post(this.SEND_TENDER_PATH,JSON.stringify(tender),{'headers':headers});
  }

  getHospital(hospitalId:string) {
    const headers = new HttpHeaders()
                    .set("content-type","application/json");
    return this.http.get(this.HOSPITAL_PATH+hospitalId,{'headers':headers});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HospitalResponseService {

  private GET_HOSPITALS_RESPONSE = "/api/tender_responses/";
  private GET_HOSPITAL_RESPONSE = "/api/tender_response/";

  constructor(private http:HttpClient) { }

  getHospitalsResponse(supplierId:string) {
    const headers = new HttpHeaders()
                    .set("content-type","application/json");
    return this.http.get(this.GET_HOSPITALS_RESPONSE+supplierId,{'headers':headers});
  }

  getHospitalResponse(supplierId:string) {
    const headers = new HttpHeaders()
                  .set("content-type","application/json");
    return this.http.get(this.GET_HOSPITAL_RESPONSE+supplierId,{'headers':headers});
  }
}

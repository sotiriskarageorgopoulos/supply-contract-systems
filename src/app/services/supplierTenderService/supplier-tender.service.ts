import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CallForTender } from '../../model/callForTender';

@Injectable({
  providedIn: 'root'
})
export class SupplierTenderService {

  constructor(private http:HttpClient) { }
  GET_CALL_FOR_TENDER_PATH = "/api/tender_announcement/";

  getCallForTender(id:string):Observable<CallForTender> {
    const headers = new HttpHeaders(). 
                        set("content-type","application/json");
    return this.http.get<CallForTender>(this.GET_CALL_FOR_TENDER_PATH+id,{'headers':headers});
  }
}

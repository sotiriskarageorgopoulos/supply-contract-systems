import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tender } from 'src/app/model/tender';

@Injectable({
  providedIn: 'root'
})
export class ManagerResponseService {

  constructor(private http:HttpClient) { }
  GET_TENDER_PATH = "/api/tender/";
  POST_DECISION_PATH = "/api/send_tender_response";

  getTender(id:string):Observable<Tender> {
    const headers = new HttpHeaders(). 
                        set("content-type","application/json");
    return this.http.get<Tender>(this.GET_TENDER_PATH+id,{'headers':headers});
  }

  postDecision(decision) {
    const headers = new HttpHeaders()
                    .set("content-type","application/json");
    return this.http.post(this.POST_DECISION_PATH,JSON.stringify(decision),{'headers':headers});
  }
}

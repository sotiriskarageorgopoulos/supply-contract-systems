import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private GET_TENDER_ANNOUNCEMENT_PATH: string = "/api/tender_announcements";
  constructor(private http:HttpClient) { }

  getCallForTenders() {
    const headers = new HttpHeaders()
                    .set("content-type","application/json");
    return this.http.get(this.GET_TENDER_ANNOUNCEMENT_PATH,{'headers':headers});
  }
}

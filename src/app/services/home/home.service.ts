import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  private SEND_TENDER_ANNOUNCEMENT_PATH: string = "/api/publish_tender_announcement";
  private GET_TENDER_NUMBER_PATH: string = "api/tender_announcements";

  sendTenderAnnouncement(tenderAnnouncementForm) {
    const headers = new HttpHeaders()
                    .set("content-type","application/json");
    return this.http.post(this.SEND_TENDER_ANNOUNCEMENT_PATH, JSON.stringify(tenderAnnouncementForm),{'headers': headers});
  }

  ///api/tender_announcements
  getTenders() {
    const headers = new HttpHeaders()
                    .set("content-type","application/json");
    return this.http.get(this.GET_TENDER_NUMBER_PATH,{'headers':headers});
  }
}

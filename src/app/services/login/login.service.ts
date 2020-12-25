import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Clerk } from '../../model/clerk';
import { Observable } from 'rxjs';
import { Hospital } from 'src/app/model/hospital';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  private LOGIN_PATH: string = '/api/login/clerk';
  private CLERK_EMAIL_PATH: string = '/api/clerk/';
  private HOSPITAL_INFO_PATH: string = "/api/hospital/";

  authentication(loginForm: FormGroup) {
    const headers = new HttpHeaders()
                  .set('content-type', 'application/json')
    return this.http.post(this.LOGIN_PATH, JSON.stringify(loginForm.value), {'headers':headers});
  }

  getClerkInfoByEmail(email: string): Observable<Clerk> {
    const headers = new HttpHeaders()
                  .set('content-type', 'application/json')
    return this.http.get<Clerk>(this.CLERK_EMAIL_PATH+email,{'headers':headers});  
  }
}

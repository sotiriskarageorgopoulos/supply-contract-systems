import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  PATH: string = '/api/login/clerk';

  public authentication(loginForm: FormGroup) {
    const headers = new HttpHeaders()
                  .set('content-type', 'application/json')
    return this.http.post(this.PATH, JSON.stringify(loginForm.value), {'headers':headers});
  }
}

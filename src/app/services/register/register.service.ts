import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  PATH: string = '/api/register/clerk';

  public register(registerForm: FormGroup) {
    const headers = new HttpHeaders()
                    .set('content-type', 'application/json');
    return this.http.post(this.PATH, JSON.stringify(registerForm.value), {'headers':headers});
  }
}

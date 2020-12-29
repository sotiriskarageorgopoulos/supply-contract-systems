import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  private REGISTER_PATH: string = '/api/register/supplier';

  register(registerForm: FormGroup) {
    const headers = new HttpHeaders()
                    .set('content-type', 'application/json');
    return this.http.post(this.REGISTER_PATH, JSON.stringify(registerForm.value), {'headers':headers});
  }
}

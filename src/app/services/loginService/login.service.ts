import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SupplierInfo } from '../../model/supplierInfo';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private LOGIN_PATH: string = '/api/login/supplier';
  private SUPPLIER_EMAIL_PATH: string = '/api/supplier/';

  authentication(loginForm: FormGroup) {
    const headers = new HttpHeaders()
                  .set('content-type', 'application/json')
    return this.http.post(this.LOGIN_PATH, JSON.stringify(loginForm.value), {'headers':headers});
  }

  getSupplierInfoByEmail(email: string): Observable<SupplierInfo> {
    const headers = new HttpHeaders()
                  .set('content-type', 'application/json')
    return this.http.get<SupplierInfo>(this.SUPPLIER_EMAIL_PATH+email,{'headers':headers});  
  }
}

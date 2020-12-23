import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private nameOfComponent: string;
  private emailOfClerk: string;

  constructor() { }

  setEmailOfClerk(email: string): void {
    this.emailOfClerk = email;
  }

  getEmailOfClerk(): string {
    return this.emailOfClerk;
  }

  getNameOfComponent(): string {
    return this.nameOfComponent;
  }

  setNameOfComponent(name: string): void {
    this.nameOfComponent = name;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private nameOfComponent: string;
  private clerkId: string;
  private hospitalLabel: string;

  constructor() { }

  getNameOfComponent(): string {
    return this.nameOfComponent;
  }

  setNameOfComponent(name: string): void {
    if(name !== null) this.nameOfComponent = name;
  }
}

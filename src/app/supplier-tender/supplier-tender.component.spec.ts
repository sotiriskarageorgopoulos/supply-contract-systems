import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTenderComponent } from './supplier-tender.component';

describe('SupplierTenderComponent', () => {
  let component: SupplierTenderComponent;
  let fixture: ComponentFixture<SupplierTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierTenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

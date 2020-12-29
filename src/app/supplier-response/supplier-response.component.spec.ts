import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierResponseComponent } from './supplier-response.component';

describe('SupplierResponseComponent', () => {
  let component: SupplierResponseComponent;
  let fixture: ComponentFixture<SupplierResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

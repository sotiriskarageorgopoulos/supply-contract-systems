import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalResponseComponent } from './hospital-response.component';

describe('HospitalResponseComponent', () => {
  let component: HospitalResponseComponent;
  let fixture: ComponentFixture<HospitalResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

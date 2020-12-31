import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsResponseComponent } from './hospitals-response.component';

describe('HospitalsResponseComponent', () => {
  let component: HospitalsResponseComponent;
  let fixture: ComponentFixture<HospitalsResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalsResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

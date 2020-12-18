import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportXMLComponent } from './import-xml.component';

describe('ImportXMLComponent', () => {
  let component: ImportXMLComponent;
  let fixture: ComponentFixture<ImportXMLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportXMLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportXMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

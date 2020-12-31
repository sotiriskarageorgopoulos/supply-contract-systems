import { TestBed } from '@angular/core/testing';

import { HospitalResponseService } from './hospital-response.service';

describe('HospitalResponseService', () => {
  let service: HospitalResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

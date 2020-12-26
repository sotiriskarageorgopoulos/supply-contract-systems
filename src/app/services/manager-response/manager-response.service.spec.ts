import { TestBed } from '@angular/core/testing';

import { ManagerResponseService } from './manager-response.service';

describe('ManagerResponseService', () => {
  let service: ManagerResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

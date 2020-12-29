import { TestBed } from '@angular/core/testing';

import { SupplierResponseService } from './supplier-response.service';

describe('SupplierResponseService', () => {
  let service: SupplierResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SupplierTenderService } from './supplier-tender.service';

describe('SupplierTenderService', () => {
  let service: SupplierTenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierTenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

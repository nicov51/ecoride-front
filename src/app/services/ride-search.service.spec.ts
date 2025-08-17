import { TestBed } from '@angular/core/testing';

import { RideSearchService } from './ride-search.service';

describe('RideSearchService', () => {
  let service: RideSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

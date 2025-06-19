import { TestBed } from '@angular/core/testing';

import { RidePublishService } from './ride-publish.service';

describe('RidePublishService', () => {
  let service: RidePublishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidePublishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

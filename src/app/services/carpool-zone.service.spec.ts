import { TestBed } from '@angular/core/testing';

import { CarpoolZoneService } from './carpool-zone.service';

describe('CarpoolZoneService', () => {
  let service: CarpoolZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarpoolZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

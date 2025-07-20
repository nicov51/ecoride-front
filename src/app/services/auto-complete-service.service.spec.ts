import { TestBed } from '@angular/core/testing';

import { AutoCompleteServiceService } from './auto-complete-service.service';

describe('AutoCompleteServiceService', () => {
  let service: AutoCompleteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoCompleteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

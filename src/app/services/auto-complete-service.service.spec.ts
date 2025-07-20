import { TestBed } from '@angular/core/testing';

import { AutoCompleteService } from './auto-complete.service';

describe('AutoCompleteServiceService', () => {
  let service: AutoCompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoCompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

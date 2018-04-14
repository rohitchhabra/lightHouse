import { TestBed, inject } from '@angular/core/testing';

import { LockService } from './lock.service';

describe('LockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LockService]
    });
  });

  it('should ...', inject([LockService], (service: LockService) => {
    expect(service).toBeTruthy();
  }));
});

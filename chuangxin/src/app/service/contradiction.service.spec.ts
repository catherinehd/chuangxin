import { TestBed, inject } from '@angular/core/testing';

import { ContradictionService } from './contradiction.service';

describe('ContradictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContradictionService]
    });
  });

  it('should be created', inject([ContradictionService], (service: ContradictionService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ProDevService } from './pro-dev.service';

describe('ProDevService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProDevService]
    });
  });

  it('should be created', inject([ProDevService], (service: ProDevService) => {
    expect(service).toBeTruthy();
  }));
});

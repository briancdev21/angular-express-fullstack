import { TestBed, inject } from '@angular/core/testing';

import { SubnavHandlerService } from './subnav-handler.service';

describe('SubnavHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubnavHandlerService]
    });
  });

  it('should be created', inject([SubnavHandlerService], (service: SubnavHandlerService) => {
    expect(service).toBeTruthy();
  }));
});

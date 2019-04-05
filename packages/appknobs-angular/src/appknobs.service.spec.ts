import { TestBed } from '@angular/core/testing';

import { AppknobsService } from './appknobs.service';

describe('AppknobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppknobsService = TestBed.get(AppknobsService);
    expect(service).toBeTruthy();
  });
});

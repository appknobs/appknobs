import { TestBed } from '@angular/core/testing';

import { AppknobsConfigService } from './appknobs-config.service';

describe('AppknobsConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppknobsConfigService = TestBed.get(AppknobsConfigService);
    expect(service).toBeTruthy();
  });
});

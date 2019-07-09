import { TestBed } from '@angular/core/testing';

import { AdminAuthProtectorService } from './admin-auth-protector.service';

describe('AdminAuthProtectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAuthProtectorService = TestBed.get(AdminAuthProtectorService);
    expect(service).toBeTruthy();
  });
});

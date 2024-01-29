import { TestBed } from '@angular/core/testing';

import { ListBackendService } from './list-backend.service';

describe('ListBackendService', () => {
  let service: ListBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

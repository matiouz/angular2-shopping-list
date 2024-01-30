import { TestBed } from '@angular/core/testing';

import { ListBackendService } from './list-backend.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListBackendService', () => {
  let service: ListBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ListBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

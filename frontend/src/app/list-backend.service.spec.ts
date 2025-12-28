import { TestBed } from '@angular/core/testing';
import { expect, describe, it, beforeEach } from 'vitest'

import { ListBackendService } from './list-backend.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ListBackendService', () => {
  let service: ListBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(ListBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ChienService } from './chien.service';

describe('ChienService', () => {
  let service: ChienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

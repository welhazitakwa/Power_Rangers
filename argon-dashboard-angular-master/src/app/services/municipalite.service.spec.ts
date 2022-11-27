import { TestBed } from '@angular/core/testing';

import { MunicipaliteService } from './municipalite.service';

describe('MunicipaliteService', () => {
  let service: MunicipaliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipaliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

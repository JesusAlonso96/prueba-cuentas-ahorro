import { TestBed } from '@angular/core/testing';

import { CuentasAhorroService } from './cuentas-ahorro.service';

describe('CuentasAhorroService', () => {
  let service: CuentasAhorroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentasAhorroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

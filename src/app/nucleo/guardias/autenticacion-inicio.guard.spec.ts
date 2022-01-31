import { TestBed } from '@angular/core/testing';

import { AutenticacionInicioGuard } from './autenticacion-inicio.guard';

describe('AutenticacionInicioGuard', () => {
  let guard: AutenticacionInicioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutenticacionInicioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

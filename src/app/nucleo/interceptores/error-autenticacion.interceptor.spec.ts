import { TestBed } from '@angular/core/testing';

import { ErrorAutenticacionInterceptor } from './error-autenticacion.interceptor';

describe('ErrorAutenticacionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorAutenticacionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorAutenticacionInterceptor = TestBed.inject(ErrorAutenticacionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

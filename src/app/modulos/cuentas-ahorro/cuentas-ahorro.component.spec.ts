import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasAhorroComponent } from './cuentas-ahorro.component';

describe('CuentasAhorroComponent', () => {
  let component: CuentasAhorroComponent;
  let fixture: ComponentFixture<CuentasAhorroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasAhorroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasAhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

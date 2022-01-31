import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCuentasAhorroComponent } from './listado-cuentas-ahorro.component';

describe('ListadoCuentasAhorroComponent', () => {
  let component: ListadoCuentasAhorroComponent;
  let fixture: ComponentFixture<ListadoCuentasAhorroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoCuentasAhorroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCuentasAhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTransaccionesComponent } from './listado-transacciones.component';

describe('ListadoTransaccionesComponent', () => {
  let component: ListadoTransaccionesComponent;
  let fixture: ComponentFixture<ListadoTransaccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoTransaccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

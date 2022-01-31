import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraDeHerramientasComponent } from './barra-de-herramientas.component';

describe('BarraDeHerramientasComponent', () => {
  let component: BarraDeHerramientasComponent;
  let fixture: ComponentFixture<BarraDeHerramientasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraDeHerramientasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraDeHerramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

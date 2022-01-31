import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCuentaAhorroComponent } from './alta-cuenta-ahorro.component';

describe('AltaCuentaAhorroComponent', () => {
  let component: AltaCuentaAhorroComponent;
  let fixture: ComponentFixture<AltaCuentaAhorroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaCuentaAhorroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaCuentaAhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

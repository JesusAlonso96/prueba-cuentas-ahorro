import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prueba-cuentas-ahorro';
  constructor(private overlayContainer: OverlayContainer) { }
  ngOnInit(): void {
    this.overlayContainer.getContainerElement().classList.add('tema-principal');
  }
}


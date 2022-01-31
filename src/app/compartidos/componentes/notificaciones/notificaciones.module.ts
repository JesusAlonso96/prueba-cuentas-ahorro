import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesComponent } from './notificaciones.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { configuracionPorDefecto, NOTIFICACIONES_CONFIGURACION_TOKEN } from './notificaciones-configuracion';



@NgModule({
  declarations: [NotificacionesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    OverlayModule
  ],
  entryComponents:[NotificacionesComponent]
})
export class NotificacionesModule { 
  public static forRoot(config = configuracionPorDefecto): ModuleWithProviders {
    return {
        ngModule: NotificacionesModule,
        providers: [
            {
                provide: NOTIFICACIONES_CONFIGURACION_TOKEN,
                useValue: { ...configuracionPorDefecto, ...config },
            },
        ],
    };
}
}

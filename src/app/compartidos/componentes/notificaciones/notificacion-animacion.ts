import { AnimationTriggerMetadata, trigger, state, style, transition, animate, keyframes } from "@angular/animations";

export const AnimacionNotificacion: {
    readonly animacionNotificacion: AnimationTriggerMetadata;
} = {
    animacionNotificacion: trigger('animacionNotificacion', [
        transition('void => *', animate('{{ fundirse }}ms cubic-bezier(0.390, 0.575, 0.565, 1.000)', keyframes([
            style({ opacity: 0, transform: 'translateX(50px)' }),
            style({ opacity: 1, transform: 'translateX(0)' }),
        ]))),
        transition('inicial => *',
            animate('{{ desaparecer }}ms cubic-bezier(0.250, 0.460, 0.450, 0.940)', keyframes([
                style({ transform: 'translateX(0)', opacity: 1 }),
                style({ transform: 'translateX(50px)', opacity: 0 })
            ]))
        ),

    ]),
};
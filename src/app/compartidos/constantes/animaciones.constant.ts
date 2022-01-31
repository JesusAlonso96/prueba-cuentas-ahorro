import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";



export const Animaciones = {
    animacionMenuLateral: trigger('animacionMenuLateral', [
        state('colapsado', style({ width: '4%', minWidth: '4%' })),
        state('expandido', style({ width: '15%' })),
        transition('expandido <=> colapsado', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    escalarEnCentro: trigger('escalarEnCentro', [
        transition('void => *', animate('100ms cubic-bezier(0.250, 0.460, 0.450, 0.940)', keyframes([
            style({ opacity: 1, transform: 'scale(0)' }),
            style({ opacity: 1, transform: 'scale(1)' })
        ]))),
        transition('inicial => *', animate('100ms cubic-bezier(0.250, 0.460, 0.450, 0.940)', keyframes([
            style({ opacity: 1 }),
            style({ opacity: 0 }),
        ])))
    ]),
    carga: trigger('carga', [
        state('abierto', style({ opacity: 1 })),
        transition(':enter', [
            style({ opacity: 0 }),
            animate(300)
        ]),
        transition(':leave',
            animate(300, style({ opacity: 0 })))
    ]),

}


// @-webkit-keyframes scale-in-center {
//     0% {
//       -webkit-transform: scale(0);
//               transform: scale(0);
//       opacity: 1;
//     }
//     100% {
//       -webkit-transform: scale(1);
//               transform: scale(1);
//       opacity: 1;
//     }
//   }
//
//   }

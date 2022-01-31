export const ExpresionesRegulares = [
    {
        //Expresion regular para nombres
        id: 0,
        expresion: '^([A-ZÑÁÉÍÓÚa-zñáéíóú]|[.]|[ ])*$',
        mensaje: 'Este campo admite letras, puntos y espacios.'
    },
    {
        //Cantidades enteras
        id: 1,
        expresion: '^[1-9]+[0-9]*$',
        mensaje: 'Este campo admite dígitos y no debe iniciar con 0.'
    },
    {
        //Colonia y calle
        id: 2,
        expresion: '^([a-zñáéíóúA-ZÑÁÉÍÓÚ0-9.!#$%&’*+/=?^_`{|}~-]|[(]|[)]|["]|[ ]|[-]|[,]|[°]|[:]|[\'])*$',
        mensaje: 'Este campo admite letras, digitos y algunos caracteres especiales.'
    },
    {
        //Numero exterior y numero interior
        id: 3,
        expresion: '^([a-zñáéíóúA-ZÑÁÉÍÓÚ0-9.!#$%&’*+/=?^_`{|}~-]|[(]|[)]|["]|[ ]|[-]|[,]|[°]|[:]|[\'])*$',
        mensaje: 'Este campo admite letras, digitos y algunos caracteres especiales.'
    },
    {
        //Solo admite letras
        id: 4,
        expresion: '^[A-Za-z]+$',
        mensaje: 'Este campo solo admite letras.'
    },
    {
        //Observaciones con espacios
        id: 5,
        expresion: '^([a-zñáéíóúA-ZÑÁÉÍÓÚ0-9.!#$%&’*+/=?^_`{|}~-]|[(]|[)]|["]|[ ]|[-]|[,]|[°]|[:]|[\']|[\r\n]|[¡]|[!])*$',
        mensaje: 'Este campo admite letras, digitos y algunos caracteres especiales.'
    }, 
    {
        //Solo digitos
        id:6,
        expresion: '^[0-9]+[0-9]*$',
        mensaje: 'Este campo admite solo dígitos'
    },
    {
        //Cantidades monetarias
        id: 7,
        expresion: '^([0-9]*)[.]?([0-9]*)$',
        mensaje: 'Este campo admite dígitos y un punto decimal.'
    }
]
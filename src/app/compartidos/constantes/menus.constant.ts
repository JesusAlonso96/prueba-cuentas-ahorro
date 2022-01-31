import { Menu } from "../modelos/menu.model";

export const MenusPorDefecto: Menu[] = [
    {
        nombre: 'Clientes',
        icono:'manage_accounts',
        ruta: '/inicio/clientes'
    },
    {
        nombre: 'Cuentas de ahorro',
        icono:'switch_account',
        ruta: '/inicio/cuentas-ahorro'
    },
    {
        nombre: 'Transacciones',
        icono:'import_export',
        ruta: '/inicio/transacciones'
    }
]
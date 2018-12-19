import { Facturacompra } from './facturacompra';

export class Proveedor {
    id: number;
    razonsocial: String;
    cuit: String;
    condicioniva: String;
    facturas: [Facturacompra];
}
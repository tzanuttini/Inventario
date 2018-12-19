import { Facturaventa } from './facturaventa';

export class Cliente {
    id: number;
    razonsocial: String;
    cuit: String;
    condicioniva: String;
    facturas: [Facturaventa];
}
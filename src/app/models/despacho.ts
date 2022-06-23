export class Despacho{
    idDespacho: string;
    fechaSalida: string;
    origenDespacho: string;
    detalles: DespachoDetalle[];
}
export class DespachoDetalle{
    idDespacho: string;
    idGuiaRemision: string;
}
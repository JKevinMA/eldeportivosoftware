export class SolicitudCotizacion{
    idSolicitudCotizacion:string;
    idTrabajador:number;
    modalidadPago:string;
    fechaGenerada:Date;
    fechaLimite:Date;
    idOrden:string;
    proveedores:ProveedorCotizacion[];
}

export class ProveedorCotizacion{
    idSolicitudCotizacion:string;
    ruc:string;
}
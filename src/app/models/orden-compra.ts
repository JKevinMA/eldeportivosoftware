export class OrdenCompra{
    idOrdenCompra:string;
    idSolicitudCotizacion:string;
    ruc:string;
    rutaProforma:string;
    costoEnvio:number=0;
    subtotal:number;
    impuesto:number;
    idTrabajador:number;
    fechaGenerada:Date;
    estado:string;

    detalles:OrdenCompraDetalle[];
}

export class OrdenCompraDetalle{
    idOrdenCompra:string;
    codigoMaterial:string;
    cantidad:number;
    precioUnitario:number;
}
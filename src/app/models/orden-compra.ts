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

    importeTotal?: number;
    modalidadPago?: string;
    telefono?: string;
    direccion?: string;
    razonSocial?: string;
    observacion?: string;
}

export class OrdenCompraDetalle{
    idOrdenCompra:string;
    codigoMaterial:string;
    cantidad:number;
    precioUnitario:number;
    material?:string;
    removido?:boolean=false;
}

export class OrdenConfeccion{
    idOrdenConfeccion:string;
    tipoProduccion:string;
    estado:string;
    idTrabajador:number;
    idOrdenPedido:string;
    idFichaES:string;
    fechaGenerado:Date;
    detalles: ConfeccionDetalle[]=[];
}

export class ConfeccionDetalle{
    idOrdenConfeccion:string;
    idCotizacion:    string;
    idPrenda:        number;
    codigoMaterial:  string;
    idTalla:         number;
    idDetalleDiseno: number;
    cantidadFabricar:number = 0;
}
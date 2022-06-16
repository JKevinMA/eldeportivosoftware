export class Orden{
    idOrden:string;
    concepto :string;
    idSolicitante :number;
    fechaGenerada : Date;
    estado :string;
    idArea:number;
    nroItems:number;
    detalles: OrdenDetalle[];
}

export class OrdenDetalle{
    idOrden:string;
    codigoMaterial:string;
    material?:string;
    presentacion?:string;
    cantidadRequerida?:number;
    precioUnidad:number=0;
    removido?:boolean=false;
}
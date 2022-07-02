import { OrdenDetalle } from "./orden";

export class FichaES{
    idFichaES:string;
    idOrdenReposicion:string;
    estado:string;
    concepto:string;
    fechaGenerada:Date;
    seleccionado:boolean=false;
    detalles:OrdenDetalle[]=[];
}
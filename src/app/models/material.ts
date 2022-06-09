export class Material{
    codigoMaterial:string ;
    nombre:string;
    descripcion:string;
    marca:string;
    presentacion:string;
    stock:number;
    cantidadMinima:number;
    precio:number;
    limite:number;
    idCategoria:number;

    categoria?:string;

    //atributos locales
    seleccionado:boolean = false;

}
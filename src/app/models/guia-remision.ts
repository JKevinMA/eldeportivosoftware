import { CotizacionDetalle } from "./cotizacion";

export class GuiaRemision {
    idGuiaRemision:  string;
    fechaEmision:    Date;
    idOrdenPedido:   string;
    idTransportista: string;
    vehiculo:        string;
    placa:           string;
    modelo:          string;
    estado:                 string;
    nombresCliente:         string;
    apellidosCliente:       string;
    nombresTransportista:   string;
    apellidosTransportista: string;
    direccion:              string;
    telefono:               string;
    idCotizacion:           string;
    fechaCreacionGuia:      Date;
    fechaEntrega:           Date;
    detalles:               CotizacionDetalle[];
    distrito: string;
    seleccionado:boolean=false;;
    
}
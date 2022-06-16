import { CotizacionDetalle } from "./cotizacion";

export class OrdenPedido {
    idOrdenPedido:  string;
    idCotizacion:   string;
    fechaRecepcion: Date;
    fechaEntrega:   Date;
    estado:         string;
    nombres:        string;
    apellidos:      string;
    direccion:      string;
    telefono:       string;
    distrito:       string;
    seleccionado:   boolean = false;
    detalles:       CotizacionDetalle[];
}

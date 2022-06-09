import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { OrdenDetalle } from 'src/app/models/orden';
import { OrdenCompra } from 'src/app/models/orden-compra';
import { Proveedor } from 'src/app/models/proveedor';
import { SolicitudCotizacion } from 'src/app/models/solicitud-cotizacion';
import { Trabajador } from 'src/app/models/trabajador';
import { SweetAlert } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-generar-orden-compra',
  templateUrl: './generar-orden-compra.component.html',
  styleUrls: ['./generar-orden-compra.component.css']
})
export class GenerarOrdenCompraComponent implements OnInit {

  fechaSolicitando = new Date();
  user:Trabajador;
  ordenCompra = new OrdenCompra();
  idSolicitudCotizacion:string = "";
  solicitudCotizacion:SolicitudCotizacion= new SolicitudCotizacion();
  ordenDetalle:OrdenDetalle[]=[];
  proveedores:Proveedor[]=[];
  ruc="0";
  direccionProveedor="-";

  subtotal=0.0;
  igv=0.0;
  importeTotal=0.0;

  readonly prefijo="OC";
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.cargarControles();
    this.user = this.api.obtenerUsuario();
  }

  cargarControles() {
    SweetAlert.startLoading();
    combineLatest(
      this.api.obtenerNuevoNroOrdenCompra(this.prefijo),
    ).subscribe(([res1]) => {
      //se obtiene el nro de orden de compra generado
      this.ordenCompra = res1.response!;

      SweetAlert.stopLoading();
    });
  }

  buscarSolicitudCotizacion(){
    SweetAlert.startLoading();
    //se obtiene la solicitud de cotizacion
    combineLatest(
      this.api.obtenerSolicitudCotizacion(this.idSolicitudCotizacion),
      this.api.obtenerProveedoresCotizacion(this.idSolicitudCotizacion),
    ).subscribe(([res1,res2]) => {
      this.solicitudCotizacion = res1.response!;
      this.proveedores = res2.response!;
      this.ruc = this.proveedores[0].ruc;
      this.direccionProveedor = this.proveedores[0].direccion;
      //se obtienen los detalles de la orden de reposición relacionada
      this.api.obtenerDetallesOrden(this.solicitudCotizacion.idOrden).subscribe(res3=>{
        this.ordenDetalle = res3.response!;
        SweetAlert.stopLoading();
      });

    });
  }

  traerDireccion(){
    this.direccionProveedor = this.proveedores.filter(p => (p.ruc == this.ruc))[0].direccion;
  }
  agregarQuitar(od:any){
    od.removido = !od.removido;
    this.calcular();
  }

  calcular(){
    console.log("calculando");
    var importeTotal = 0;
    this.ordenDetalle.forEach(od=>{
      if(!od.removido){
        importeTotal= importeTotal+(od.cantidadRequerida! * od.precioUnidad!);
      }
    });
    this.importeTotal = (+ importeTotal) + (+this.ordenCompra.costoEnvio);
  }
}

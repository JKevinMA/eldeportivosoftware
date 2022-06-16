import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { OrdenDetalle } from 'src/app/models/orden';
import { OrdenCompra } from 'src/app/models/orden-compra';
import { Proveedor } from 'src/app/models/proveedor';
import { SolicitudCotizacion } from 'src/app/models/solicitud-cotizacion';
import { Trabajador } from 'src/app/models/trabajador';
import { SweetAlert } from 'src/app/utils/sweet-alert';
import Swal from 'sweetalert2';

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
  readonly estado="Generado";
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
      if(this.proveedores.length!=0){
        this.ruc = this.proveedores[0].ruc;
        this.direccionProveedor = this.proveedores[0].direccion;
        //se obtienen los detalles de la orden de reposición relacionada
        this.api.obtenerDetallesOrden(this.solicitudCotizacion.idOrden).subscribe(res3=>{
          this.ordenDetalle = res3.response!;
          SweetAlert.stopLoading();
        });
      }else{
        Swal.fire('Información','No existen detalles de la solicitud de cotizacion consultada','info');
      }
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
    var importeSuma = 0;
    this.ordenDetalle.forEach(od=>{
      if(!od.removido){
        importeSuma= importeSuma +((od.cantidadRequerida||0) * (od.precioUnidad||0));
      }
    });
    this.importeTotal = (+ importeSuma) + (+this.ordenCompra.costoEnvio);
    this.subtotal = importeSuma * 0.82;
    this.ordenCompra.subtotal = this.subtotal;
    this.igv = importeSuma * 0.18;
    this.ordenCompra.impuesto = this.igv;
  }

  registrar(){
    
    Swal.fire({
      title: 'Confirmación',
      text: `Usted va a generar la Orden de Compra nro ${this.ordenCompra.idOrdenCompra}, ¿Desea continuar? `,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Sí`,
      denyButtonText: `No`,
      allowOutsideClick: false,
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {

        SweetAlert.startLoading();

        Swal.showLoading();
        
        this.ordenCompra.ruc = this.ruc;
        this.ordenCompra.fechaGenerada = this.fechaSolicitando;
        this.ordenCompra.idTrabajador = this.user.idTrabajador;
        this.ordenCompra.rutaProforma  ='ruta-prueba/cotizacion.pdf';
        this.ordenCompra.idSolicitudCotizacion  = this.idSolicitudCotizacion;
        this.ordenCompra.estado = this.estado;

        this.ordenCompra.detalles = [];

        this.ordenDetalle.forEach(od=>{
          if(!od.removido){
            this.ordenCompra.detalles.push({idOrdenCompra:this.ordenCompra.idOrdenCompra,codigoMaterial:od.codigoMaterial,cantidad:od.cantidadRequerida || 0,precioUnitario:od.precioUnidad || 0});
          }
        });

        console.log(this.ordenCompra);
        
        this.api.registrarNuevaOrdenCompra(this.ordenCompra).subscribe(r => {
          if (r.success) {
            if(r.response! > 0){
              
              SweetAlert.alertaRegistroCorrecto();
            }
          } else {
            SweetAlert.alertaRegistroError(r.message);
          }
        }, err => {
          if (err.name == "HttpErrorResponse") {
            SweetAlert.alertaConexionError();
            return;
          }

          SweetAlert.alertaOtroError(err);
        });

      } else if (result.isDenied) {

      }
    });
  }
}

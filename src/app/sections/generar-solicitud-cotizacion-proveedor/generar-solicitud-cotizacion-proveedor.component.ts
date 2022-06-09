import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Orden, OrdenDetalle } from 'src/app/models/orden';
import { Proveedor } from 'src/app/models/proveedor';
import { SolicitudCotizacion } from 'src/app/models/solicitud-cotizacion';
import { Trabajador } from 'src/app/models/trabajador';
import { SweetAlert } from 'src/app/utils/sweet-alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-solicitud-cotizacion-proveedor',
  templateUrl: './generar-solicitud-cotizacion-proveedor.component.html',
  styleUrls: ['./generar-solicitud-cotizacion-proveedor.component.css']
})
export class GenerarSolicitudCotizacionProveedorComponent implements OnInit {
  
  ordenes:Orden[]=[];
  idOrdenSeleccionado = "";
  detallesOrden:OrdenDetalle[]=[];
  proveedores:Proveedor[]=[];
  proveedoresSeleccionados:Proveedor[]=[];
  solicitudCotizacion:SolicitudCotizacion = new SolicitudCotizacion();

  textError:string='';
  tipoParametro:string='ruc';
  valorBusqueda:string='';
  model: NgbDateStruct;
  user:Trabajador;
  modalidadPago:string="Contado";

  fechaActual:string;

  readonly prefijo="SCP";
  readonly conceptoOrden="Reposición de Materiales";
  readonly estadoInicialOrden="Pendiente de Evaluación";
  readonly estadoFinalAceptadoOrden="Aceptado";
  readonly estadoFinalAnuladoOrden="Anulado";

  constructor(private api: ApiService) { 
  }
  
  ngOnInit(): void {
    this.cargarControles();
    this.user = this.api.obtenerUsuario();
    this.fechaActual = '2022-06-08';
  }

  cargarControles() {
    SweetAlert.startLoading();
    combineLatest(
      this.api.obtenerOrdenes(this.conceptoOrden,this.estadoInicialOrden),
      this.api.obtenerNuevoNroSolicitudCotizacion(this.prefijo),
    ).subscribe(([res1,res2]) => {
      //se obtienen las ordenes
      this.ordenes = res1.response!;
      //se obtiene el nro de solicitud de cotizacion generado
      this.solicitudCotizacion = res2.response!;

      SweetAlert.stopLoading();
    });
  }

  obtenerDetallesOrden(idOrden:string){
    this.idOrdenSeleccionado = idOrden;
    //se obtienen los detalles de la orden
    SweetAlert.startLoading();
    combineLatest(
      this.api.obtenerDetallesOrden(this.idOrdenSeleccionado),
    ).subscribe(([res1]) => {
      this.detallesOrden = res1.response!;
      SweetAlert.stopLoading();
    });
  }

  actualizarOrden(estado:string,idOrden:string){
    //se actualiza el estado de la orden 

    Swal.fire({
      title: 'Confirmación',
      text: `Usted actualizará el estado de la Orden nro ${idOrden} a ${estado}, ¿Desea continuar? `,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Sí`,
      denyButtonText: `No`,
      allowOutsideClick: false,
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {

        SweetAlert.startLoading();
        combineLatest(
          this.api.actualizarEstadoOrden(estado,idOrden),
        ).subscribe(([r]) => {
          if (r.success) {
            if(r.response! > 0){
              SweetAlert.alertaActualizacionCorrecto();
            }
          } else {
            SweetAlert.alertaActualizacionError(r.message);
          }
        });

      } else if (result.isDenied) {

      }
    });

    
  }

  ingresaValorBusqueda(){
    if(this.tipoParametro=='ruc'){
      if(this.valorBusqueda.length!=11 && this.valorBusqueda.length!=0){
        this.textError = "Campo inválido, se solicita que ingrese solo caracteres numéricos de 11 dígitos";
      }else{
        this.textError = "";
      }
    }
    else if(this.tipoParametro=='razonsocial')
    {
      this.textError = "";
    }
  }

  buscarProveedor(){
    //se obtienen los proveedores segun los parametros
    SweetAlert.startLoading();
    combineLatest(
      this.api.obtenerProveedores(this.tipoParametro,this.valorBusqueda),
    ).subscribe(([res1]) => {
      console.log(res1);
      this.proveedores = res1.response!;
      SweetAlert.stopLoading();
    });
  }

  agregarProveedoresSeleccionados(){
    var listaAux = this.proveedores.filter((prov)=>prov.seleccionado);
    
    for (let i = 0; i < listaAux.length; i++) {
      var existe=false;
      for (let j = 0; j < this.proveedoresSeleccionados.length; j++) {
        if(listaAux[i].ruc == this.proveedoresSeleccionados[j].ruc){
          existe = true;
          break;
        }
      }
      if(!existe){
        this.proveedoresSeleccionados.push(listaAux[i]);
      }
    }
  }
  registrar(){
    Swal.fire({
      title: 'Confirmación',
      text: `Usted va a generar la Solicitud de Cotizacion nro ${this.solicitudCotizacion.idSolicitudCotizacion}, ¿Desea continuar? `,
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
        
        this.solicitudCotizacion.idTrabajador = this.user.idTrabajador;
        this.solicitudCotizacion.modalidadPago = this.modalidadPago;
        this.solicitudCotizacion.fechaLimite = new Date();
        this.solicitudCotizacion.idOrden = this.idOrdenSeleccionado;
        this.solicitudCotizacion.proveedores = [];
        
        this.proveedoresSeleccionados.forEach(mr=>{
          this.solicitudCotizacion.proveedores.push({ruc:mr.ruc,idSolicitudCotizacion:this.solicitudCotizacion.idSolicitudCotizacion});
        });

        console.log(JSON.stringify(this.solicitudCotizacion));
        
        this.api.registrarNuevaSolicitudCotizacion(this.solicitudCotizacion).subscribe(r => {
          if (r.success) {
            if(r.response! > 0){

              //actualizando estado a la orden seleccionada
              this.api.actualizarEstadoOrden(this.estadoFinalAceptadoOrden,this.idOrdenSeleccionado).subscribe(r=>{
                SweetAlert.alertaRegistroCorrecto();
              });

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

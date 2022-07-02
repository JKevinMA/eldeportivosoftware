import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Orden, OrdenDetalle } from 'src/app/models/orden';
import { Proveedor } from 'src/app/models/proveedor';
import { SolicitudCotizacion } from 'src/app/models/solicitud-cotizacion';
import { Trabajador } from 'src/app/models/trabajador';
import { SweetAlert } from 'src/app/utils/sweet-alert';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
  limiteRango: NgbDateStruct;
  user:Trabajador;
  modalidadPago:string="Contado";

  fechaActual:Date;

  readonly prefijo="SCP";
  readonly conceptoOrden="Reposición de Materiales";
  readonly estadoInicialOrden="Pendiente de Evaluación";
  readonly estadoFinalAceptadoOrden="Aceptado";
  readonly estadoFinalAnuladoOrden="Anulado";

  constructor(private api: ApiService,private calendar: NgbCalendar) { 
    this.model = this.calendar.getToday();
    this.limiteRango = this.calendar.getToday();
  }
  
  ngOnInit(): void {
    this.cargarControles();
    this.user = this.api.obtenerUsuario();
    this.fechaActual = new Date(); 
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
          this.solicitudCotizacion.proveedores.push({razonSocial:mr.razonSocial,ruc:mr.ruc,idSolicitudCotizacion:this.solicitudCotizacion.idSolicitudCotizacion});
        });
        
        this.api.registrarNuevaSolicitudCotizacion(this.solicitudCotizacion).subscribe(r => {
          if (r.success) {
            if(r.response! > 0){
              //actualizando estado a la orden seleccionada
              this.api.actualizarEstadoOrden(this.estadoFinalAceptadoOrden,this.idOrdenSeleccionado).subscribe(r=>{
                SweetAlert.alertaRegistroCorrecto();
              });
              
              this.generarPDFs();
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

  generarPDFs(){
    this.solicitudCotizacion.proveedores.forEach(p=>{
      this.generarPDF(p.razonSocial,new Date().toISOString().substring(0,10),this.modalidadPago,new Date(this.model.year,this.model.month -1, this.model.day).toISOString().substring(0,10));
    });
  }

  generarPDF(proveedor:string,fecha:string,formaPago:string,fechaMaxima:string){
    var pdfDefinition = {
      content: [
        {
          text: 'SOLICITUD DE COTIZACIÓN',
          style: 'titulo_uno',
          margin: [ 0, 0, 0, 20 ]
        },
        {
          text: proveedor,
          style: 'proveedor',
          margin: [ 0, 50, 0, 20 ]
        },
        {
           text:[{text:'Datos del solicitante:',bold:true},{text:'  Empresa de Confecciones El Deportivo'}]
        },
        {
            margin: [ 0, 10, 0, 20 ],
          text: fecha,
          style: 'fecha'
        },
        {
          table: {
                headerRows: 1,
                widths: [ 100, '*','auto', 100],
        
                body: [
                  [ 'Codigo', 'Producto','Unidad de Medida', 'Cantidad'],
                  /* [ { text: 'M001', bold: true }, 'Tela Poliester rojo','rollos', '70'],
                  [ { text: 'M002', bold: true }, 'Tela Poliester blanco','rollos', '80'], */
                ]
              },
              margin:[0,0,0,20]
        },
        {
           text:[{text:'Forma de pago:',bold:true},{text:'  '+formaPago}],
           margin:[0,0,0,10]
        },
        {
           text:[{text:'Fecha máxima para la entrega:',bold:true},{text:'  '+fechaMaxima}]
        },
      
      ],
      styles: {
          titulo_uno:{
              alignment:'center',
              fontSize: 18,
          bold: true
          },
          proveedor:{
              alignment:'left',
              fontSize: 14,
          bold: true
          },
        fecha: {
            alignment:'right',
          fontSize: 12,
          bold: true
        }
      }
      
    }

    var pdf = pdfMake.createPdf(pdfDefinition);
    pdf.download();
  }

  
}

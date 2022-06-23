import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Despacho } from 'src/app/models/despacho';
import { GuiaRemision } from 'src/app/models/guia-remision';
import { SweetAlert } from 'src/app/utils/sweet-alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-despacho-pedido',
  templateUrl: './generar-despacho-pedido.component.html',
  styleUrls: ['./generar-despacho-pedido.component.css']
})
export class GenerarDespachoPedidoComponent implements OnInit {

  constructor(private api:ApiService) { }
  readonly estadoGuiasRemision= 'Emitido';
  readonly fecha  = new Date().toISOString().substring(0, 10);
  readonly origenDespacho ='Jirón Paucartambo 741 - Tarma';
  readonly prefijo = 'DSP';
  invalido = false;
  busqueda:string = '';

  despacho:Despacho = new Despacho();
  guiasRemisionTotales:GuiaRemision[] =[];
  guiasRemisionFiltrados:GuiaRemision[] =[];
  guiasRemisionSeleccionados:GuiaRemision[] =[];

  ngOnInit(): void {
    combineLatest([
      this.api.obtenerNuevoNroDespacho(this.prefijo),
      this.api.obtenerGuiasRemision(this.fecha,this.estadoGuiasRemision),
    ]).subscribe(([res1,res2])=>{
      if(res1.success){
        this.despacho = res1.response!;
      }
      if(res2.success){
        this.guiasRemisionTotales = res2.response!;
        this.guiasRemisionFiltrados = this.guiasRemisionTotales;
      }
      SweetAlert.stopLoading();
    });
  }
  
  buscarGuiaRemision(){
    if(this.busqueda.trim().length==0){
      this.guiasRemisionFiltrados = this.guiasRemisionTotales;
    }else{
      this.guiasRemisionFiltrados = this.guiasRemisionTotales.filter(pt=>pt.distrito.toLowerCase().includes(this.busqueda.toLowerCase()));
    }
  }

  agregarGuiaRemision(){
    var listaAux = this.guiasRemisionFiltrados.filter((grf)=>grf.seleccionado);
    
    for (let i = 0; i < listaAux.length; i++) {
      var existe=false;
      for (let j = 0; j < this.guiasRemisionSeleccionados.length; j++) {
        if(listaAux[i].idGuiaRemision == this.guiasRemisionSeleccionados[j].idGuiaRemision){
          existe = true;
          break;
        }
      }
      if(!existe){
        this.guiasRemisionSeleccionados.push(listaAux[i]);
      }
    }
  }


  registrar(){
    Swal.fire({
      title: 'Confirmación',
      text: `Usted va a generar el Despacho nro ${this.despacho.idDespacho}, ¿Desea continuar? `,
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
        
        this.despacho.origenDespacho = this.origenDespacho;
        this.despacho.detalles = [];
        
        this.guiasRemisionSeleccionados.forEach(mr=>{
          this.despacho.detalles.push({idDespacho:this.despacho.idDespacho,idGuiaRemision:mr.idGuiaRemision});
        });

        this.api.registrarNuevoDespacho(this.despacho).subscribe(r => {
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


  validar(e:any){
    console.log(e);
    if(this.esNumero(e.key)){
      this.invalido = true;
    }else{
      this.invalido = false;
    }
  }
  esNumero(l:string):boolean{
    switch (l) {
      case '1':
        return true;
      case '2':
        return true;
      case '3':
        return true;
      case '4':
        return true;
      case '5':
        return true;
      case '6':
        return true;
      case '7':
        return true;
      case '8':
        return true;
      case '9':
        return true;
      case '0':
        return true;
    
      default:
        return false;
    }
  }
  borrarBusqueda(){
    if(this.busqueda.length!=0){
      var letra = {key:this.busqueda.substring((this.busqueda.length-2),(this.busqueda.length-1))};
      this.validar(letra);
    }else{
      this.invalido = false;
    }
  }
}

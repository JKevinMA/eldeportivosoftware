import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Distrito } from 'src/app/models/distrito';
import { GuiaRemision } from 'src/app/models/guia-remision';
import { OrdenPedido } from 'src/app/models/orden-pedido';
import { Transportista } from 'src/app/models/transportista';
import { SweetAlert } from 'src/app/utils/sweet-alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-guia-remision',
  templateUrl: './generar-guia-remision.component.html',
  styleUrls: ['./generar-guia-remision.component.css']
})
export class GenerarGuiaRemisionComponent implements OnInit {

  distritos:Distrito[]=[];
  idDistrito:number=0;

  transportistas:Transportista[]=[];
  idTransportista:number;

  guiaRemision:GuiaRemision=new GuiaRemision();
  ordenPedido:OrdenPedido=new OrdenPedido();
  transportista:Transportista = new Transportista();

  readonly estadoOrdenesPedido = 'Pendiente de entrega';
  readonly fecha  = new Date().toISOString().substring(0, 10);
  readonly puntoSalida ='Jirón Paucartambo 741 - Tarma';
  readonly prefijo = 'GRR';

  constructor(private api:ApiService) { 
  }

  ngOnInit(): void {
    this.cargarControles();
  }

  cargarControles(){
    SweetAlert.startLoading();
    combineLatest(
      this.api.obtenerDistritos(),
      this.api.obtenerNuevoNroGuiaRemision(this.prefijo)
    ).subscribe(([res1,res2]) => {
      this.distritos = res1.response!;
      this.idDistrito = this.distritos[0].idDistrito;
      this.guiaRemision = res2.response!;
      SweetAlert.stopLoading();
    });
  }

  buscarTransportistas(){
    SweetAlert.startLoading();
    this.api.obtenerTransportistas(this.idDistrito).subscribe(r=>{
      this.transportistas = r.response!;
      SweetAlert.stopLoading();
    });
  }

  agregaOrdenPedido(ordenPedido:any){
    this.ordenPedido = ordenPedido;
  }

  agregarTransportista(){
    var c=0;
    this.transportistas.forEach(p=>{
      if(p.seleccionado){
        c++;
      }
    });
    if(c>1){
      Swal.fire('Alerta','Se solicita que solo seleccione una fila correspondiente.','warning');
    }
    if(c==1){
      this.transportistas.forEach(t=>{
        if(t.seleccionado){
          this.transportista = t;     
        }
      });
    }
  }

  registrar(){
    Swal.fire({
      title: 'Confirmación',
      text: `Usted va a generar la Guía nro ${this.guiaRemision.idGuiaRemision}, ¿Desea continuar? `,
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
        this.guiaRemision.idOrdenPedido = this.ordenPedido.idOrdenPedido;
        this.guiaRemision.idTransportista = this.transportista.idTransportista;
        this.guiaRemision.vehiculo = this.transportista.vehiculo;
        this.guiaRemision.placa = this.transportista.placa;
        this.guiaRemision.modelo = this.transportista.modelo;

        this.api.registrarNuevaGuiaRemision(this.guiaRemision).subscribe(r => {
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

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { CotizacionDetalle } from 'src/app/models/cotizacion';
import { Orden } from 'src/app/models/orden';
import { OrdenPedido } from 'src/app/models/orden-pedido';
import { SweetAlert } from 'src/app/utils/sweet-alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busqueda-pedido',
  templateUrl: './busqueda-pedido.component.html',
  styleUrls: ['./busqueda-pedido.component.css']
})
export class BusquedaPedidoComponent implements OnInit {


  pedidosTotales : OrdenPedido[];
  pedidosFiltrados : OrdenPedido[];
  invalido = false;
  
  @Input() fecha:string;
  @Input() estado:string;
  @Output() seleccionaOrdenPedido = new EventEmitter<OrdenPedido>();
  constructor(private api:ApiService) { }

  busqueda:string = '';

  ngOnInit(): void {
    SweetAlert.startLoading();
    this.api.obtenerOrdenesPedidos(this.fecha,this.estado).subscribe(r=>{
      if(r.success){
        this.pedidosTotales = r.response!;
        this.pedidosFiltrados = this.pedidosTotales;
        console.log(r);
      }
      SweetAlert.stopLoading();
    });
  }

  buscarOrdenPedido(){
    if(this.busqueda.trim().length==0){
      this.pedidosFiltrados = this.pedidosTotales;
    }else{
      this.pedidosFiltrados = this.pedidosTotales.filter(pt=>pt.distrito.toLowerCase().includes(this.busqueda.toLowerCase()));
    }
  }

  agregarOrdenPedido(){
    var c=0;
    this.pedidosFiltrados.forEach(p=>{
      if(p.seleccionado){
        c++;
      }
    });
    if(c>1){
      Swal.fire('Alerta','Se solicita que solo seleccione una fila correspondiente.','warning');
    }
    if(c==1){
      this.pedidosFiltrados.forEach(p=>{
        if(p.seleccionado){
          this.seleccionaOrdenPedido.emit(p);      
        }
      });
    }
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

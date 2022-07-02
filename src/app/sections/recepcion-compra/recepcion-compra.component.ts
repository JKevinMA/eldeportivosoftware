import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { OrdenCompra } from 'src/app/models/orden-compra';
import { OrdenPago } from 'src/app/models/orden-pago';
import { SweetAlert } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-recepcion-compra',
  templateUrl: './recepcion-compra.component.html',
  styleUrls: ['./recepcion-compra.component.css']
})
export class RecepcionCompraComponent implements OnInit {

  readonly estadoOrdenCompra = 'Generado';
  ordenesCompra : OrdenCompra[]=[];
  ordenPago:OrdenPago = new OrdenPago();
  ordenCompraSeleccionada : OrdenCompra = new OrdenCompra();
  readonly prefijo = 'OPP';
  readonly fecha  = new Date().toISOString().substring(0, 10);
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.cargarControles();
  }

  cargarControles(){
    SweetAlert.startLoading();
    combineLatest([
      this.api.obtenerOrdenesCompra(),
      this.api.obtenerNuevoNroOrdenPago(this.prefijo)
    ]).subscribe(([res1,res2])=>{
      if(res1.success){
        this.ordenesCompra=res1.response!;
      }else{
        console.log(res1.message);
      }
      if(res2.success){
        this.ordenPago=res2.response!;
      }else{
        console.log(res2.message);
      }
      SweetAlert.stopLoading();

    });
  }
  registrar(){

  }

}

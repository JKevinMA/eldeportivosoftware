import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recepcion-compra',
  templateUrl: './recepcion-compra.component.html',
  styleUrls: ['./recepcion-compra.component.css']
})
export class RecepcionCompraComponent implements OnInit {

  readonly estadoOrdenCompra = 'Generado';
  
  constructor() { }

  ngOnInit(): void {
  }

  registrar(){

  }

}

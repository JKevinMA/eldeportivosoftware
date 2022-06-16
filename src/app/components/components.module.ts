import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { BusquedaPedidoComponent } from './busqueda-pedido/busqueda-pedido.component';
import { GenerarFichaESMaterialComponent } from './generar-ficha-e-s-material/generar-ficha-e-s-material.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AsideComponent,
    HeaderComponent,
    BusquedaPedidoComponent,
    GenerarFichaESMaterialComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    AsideComponent,
    HeaderComponent,
    GenerarFichaESMaterialComponent,
    BusquedaPedidoComponent
  ]
})
export class ComponentsModule { }

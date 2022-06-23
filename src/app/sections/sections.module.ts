import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarOrdenReposicionComponent } from './generar-orden-reposicion/generar-orden-reposicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerarSolicitudCotizacionProveedorComponent } from './generar-solicitud-cotizacion-proveedor/generar-solicitud-cotizacion-proveedor.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { GenerarOrdenCompraComponent } from './generar-orden-compra/generar-orden-compra.component';
import { SolicitudMaterialesSuministroComponent } from './solicitud-materiales-suministro/solicitud-materiales-suministro.component';
import { GenerarEntregaMaterialFabricacionComponent } from './generar-entrega-material-fabricacion/generar-entrega-material-fabricacion.component';
import { GenerarGuiaRemisionComponent } from './generar-guia-remision/generar-guia-remision.component';
import { ComponentsModule } from '../components/components.module';
import { GenerarDespachoPedidoComponent } from './generar-despacho-pedido/generar-despacho-pedido.component';
import { AlmacenarMaterialesComponent } from './almacenar-materiales/almacenar-materiales.component';
import { RecepcionCompraComponent } from './recepcion-compra/recepcion-compra.component';



@NgModule({
  declarations: [
    GenerarOrdenReposicionComponent,
    GenerarSolicitudCotizacionProveedorComponent,
    GenerarOrdenCompraComponent,
    SolicitudMaterialesSuministroComponent,
    GenerarEntregaMaterialFabricacionComponent,
    GenerarGuiaRemisionComponent,
    GenerarDespachoPedidoComponent,
    AlmacenarMaterialesComponent,
    RecepcionCompraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    ComponentsModule
  ],
  exports:[
    GenerarOrdenReposicionComponent,
    GenerarSolicitudCotizacionProveedorComponent,
    GenerarOrdenCompraComponent,
    SolicitudMaterialesSuministroComponent,
    GenerarEntregaMaterialFabricacionComponent,
    GenerarGuiaRemisionComponent,
    GenerarDespachoPedidoComponent,
    RecepcionCompraComponent
  ]
})
export class SectionsModule { }

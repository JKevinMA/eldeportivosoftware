import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarOrdenReposicionComponent } from './generar-orden-reposicion/generar-orden-reposicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerarSolicitudCotizacionProveedorComponent } from './generar-solicitud-cotizacion-proveedor/generar-solicitud-cotizacion-proveedor.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { GenerarOrdenCompraComponent } from './generar-orden-compra/generar-orden-compra.component';



@NgModule({
  declarations: [
    GenerarOrdenReposicionComponent,
    GenerarSolicitudCotizacionProveedorComponent,
    GenerarOrdenCompraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  exports:[
    GenerarOrdenReposicionComponent,
    GenerarSolicitudCotizacionProveedorComponent,
    GenerarOrdenCompraComponent
  ]
})
export class SectionsModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { Error404Component } from './pages/error404/error404.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { AlmacenarMaterialesComponent } from './sections/almacenar-materiales/almacenar-materiales.component';
import { GenerarDespachoPedidoComponent } from './sections/generar-despacho-pedido/generar-despacho-pedido.component';
import { GenerarGuiaRemisionComponent } from './sections/generar-guia-remision/generar-guia-remision.component';
import { GenerarOrdenCompraComponent } from './sections/generar-orden-compra/generar-orden-compra.component';
import { GenerarOrdenConfeccionComponent } from './sections/generar-orden-confeccion/generar-orden-confeccion.component';
import { GenerarOrdenReposicionComponent } from './sections/generar-orden-reposicion/generar-orden-reposicion.component';
import { GenerarSolicitudCotizacionProveedorComponent } from './sections/generar-solicitud-cotizacion-proveedor/generar-solicitud-cotizacion-proveedor.component';
import { RecepcionCompraComponent } from './sections/recepcion-compra/recepcion-compra.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    canActivate:[AuthGuard],
    path:'inicio',
    component: InicioComponent,
    children:[
      {path:'orden-reposicion',component: GenerarOrdenReposicionComponent},
      {path:'solicitud-cotizacion-proveedor',component: GenerarSolicitudCotizacionProveedorComponent},
      {path:'orden-compra',component: GenerarOrdenCompraComponent},
      {path:'generar-guia-remision',component: GenerarGuiaRemisionComponent},
      {path:'generar-despacho-pedido',component: GenerarDespachoPedidoComponent},
      {path:'almacenar-materiales',component: AlmacenarMaterialesComponent},
      {path:'recepcion-compra',component: RecepcionCompraComponent},
      {path:'generar-orden-confeccion',component: GenerarOrdenConfeccionComponent},
    ]

  },
  {
    path:'**',
    component: Error404Component
  },
  {
    path: '**', redirectTo:'/login',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

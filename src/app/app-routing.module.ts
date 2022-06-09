import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { Error404Component } from './pages/error404/error404.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { GenerarOrdenCompraComponent } from './sections/generar-orden-compra/generar-orden-compra.component';
import { GenerarOrdenReposicionComponent } from './sections/generar-orden-reposicion/generar-orden-reposicion.component';
import { GenerarSolicitudCotizacionProveedorComponent } from './sections/generar-solicitud-cotizacion-proveedor/generar-solicitud-cotizacion-proveedor.component';

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

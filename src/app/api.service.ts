import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from './models/result.model';
import { map } from 'rxjs';
import { Trabajador } from './models/trabajador';
import { Categoria } from './models/categoria';
import { Material } from './models/material';
import { Orden, OrdenDetalle } from './models/orden';
import { SolicitudCotizacion } from './models/solicitud-cotizacion';
import { Proveedor } from './models/proveedor';
import { OrdenCompra } from './models/orden-compra';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL = environment.url_api;
  token:string | null="";
  constructor(private http:HttpClient) {
    this.leerToken();
  }

    //Metodos auxiliares
  leerToken() {
    if(localStorage.getItem('token-eldeportivo-app')){
      this.token = localStorage.getItem('token-eldeportivo-app');
    }else{
      this.token = "";
    }
  }

  estaAutenticado(): boolean{
    this.leerToken();
    return this.token!.length>2;
  }

  login(usuario:Trabajador){
    return this.http.post<any>(`${this.BASE_URL}trabajador/login`,usuario)
    .pipe(
      map( (res:Result<Trabajador>) =>{
        if(res.response!=null && res.success){
          this.guardarUsuario(res);
        }
        return res;
        }) 
      );
  }

  logout(){
    localStorage.removeItem('token-eldeportivo-app');
    localStorage.removeItem('user-eldeportivo-app');
  }

  guardarUsuario(r:Result<Trabajador>){
    localStorage.setItem('token-eldeportivo-app',"true");
    localStorage.setItem('user-eldeportivo-app',JSON.stringify(r.response));
  }

  obtenerUsuario():Trabajador{
    var user:Trabajador= new Trabajador();
    var objectUser = localStorage.getItem('user-eldeportivo-app');
    if(objectUser!=null){
      user = JSON.parse(objectUser);
    }
    return user;
  }

  //METODOS PRINCIPALES
  //  GENERAR ORDEN DE REPOSICIÓN DE MATERIALES
  obtenerCategorias(){
    return this.http.get<Result<Categoria[]>>(`${this.BASE_URL}ordenreposicion/categorias`);
  }

  obtenerMaterialesDeficit(idCategoria:number){
    return this.http.get<Result<Material[]>>(`${this.BASE_URL}ordenreposicion/materiales-deficit?idCategoria=${idCategoria}`);
  }

  obtenerNuevoNroOrden(prefijo:string,concepto:string){
    return this.http.get<Result<Orden>>(`${this.BASE_URL}ordenreposicion/nro-orden?prefijo=${prefijo}&concepto=${concepto}`);
  }

  registrarNuevaOrden(orden:Orden){
    return this.http.post<Result<number>>(`${this.BASE_URL}ordenreposicion`,orden);
  }

  //  GENERAR SOLICITUD DE COTIZACION PARA PROVEEDORES
  obtenerOrdenes(concepto:string,estado:string){
    return this.http.get<Result<Orden[]>>(`${this.BASE_URL}solicitudCotizacion/ordenes?concepto=${concepto}&estado=${estado}`);
  }

  obtenerDetallesOrden(idOrden:string){
    return this.http.get<Result<OrdenDetalle[]>>(`${this.BASE_URL}solicitudCotizacion/detalles-orden?idOrden=${idOrden}`);
  }

  obtenerProveedores(campo:string,valor:string){
    return this.http.get<Result<Proveedor[]>>(`${this.BASE_URL}solicitudCotizacion/proveedores?campo=${campo}&valor=${valor}`);
  }

  actualizarEstadoOrden(estado:string,idOrden:string){
    return this.http.get<Result<number>>(`${this.BASE_URL}solicitudCotizacion/orden-estado?estado=${estado}&idOrden=${idOrden}`);
  }

  obtenerNuevoNroSolicitudCotizacion(prefijo:string){
    return this.http.get<Result<SolicitudCotizacion>>(`${this.BASE_URL}solicitudCotizacion/nro-solicitud-cotizacion?prefijo=${prefijo}`);
  }

  registrarNuevaSolicitudCotizacion(solicitud:SolicitudCotizacion){
    return this.http.post<Result<number>>(`${this.BASE_URL}solicitudCotizacion`,solicitud);
  }

  //  GENERAR ORDEN DE COMPRA
  obtenerNuevoNroOrdenCompra(prefijo:string){
    return this.http.get<Result<OrdenCompra>>(`${this.BASE_URL}ordencompra/nro-orden-compra?prefijo=${prefijo}`);
  }
  obtenerSolicitudCotizacion(idSolicitudCotizacion:string){
    return this.http.get<Result<SolicitudCotizacion>>(`${this.BASE_URL}ordencompra/solicitud-cotizacion?idSolicitudCotizacion=${idSolicitudCotizacion}`);
  }
  obtenerProveedoresCotizacion(idSolicitudCotizacion:string){
    return this.http.get<Result<Proveedor[]>>(`${this.BASE_URL}ordencompra/proveedores-cotizacion?idSolicitudCotizacion=${idSolicitudCotizacion}`);
  }
  registrarNuevaOrdenCompra(ordenCompra:OrdenCompra){
    return this.http.post<Result<number>>(`${this.BASE_URL}ordencompra`,ordenCompra);
  }

}
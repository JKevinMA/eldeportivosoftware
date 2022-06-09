import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Categoria } from 'src/app/models/categoria';
import { Material } from 'src/app/models/material';
import { Orden } from 'src/app/models/orden';
import { Trabajador } from 'src/app/models/trabajador';
import { SweetAlert } from 'src/app/utils/sweet-alert';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-generar-orden-reposicion',
  templateUrl: './generar-orden-reposicion.component.html',
  styleUrls: ['./generar-orden-reposicion.component.css']
})
export class GenerarOrdenReposicionComponent implements OnInit {

  categorias: Categoria[]=[];
  idCategoriaSeleccionado:number=0;
  materiales: Material[]=[];
  materialesRequeridos :Material[]=[];
  orden = new Orden();
  user:Trabajador;

  readonly prefijo="ORP";
  readonly concepto="Reposición de Materiales";
  readonly estado="Pendiente de Evaluación";
  fechaSolicitando = new Date(); 

  constructor(private api: ApiService) { 
  }

  ngOnInit(): void {
    this.cargarControles();
    this.user = this.api.obtenerUsuario();
  }
  cargarControles() {
    SweetAlert.startLoading();
    combineLatest(
      this.api.obtenerCategorias(),
      this.api.obtenerNuevoNroOrden(this.prefijo,this.concepto),
    ).subscribe(([res1,res2]) => {
      //se obtiene categorias
      this.categorias = res1.response!;
      this.idCategoriaSeleccionado = this.categorias[0].idCategoria;

      //se obtiene el nro de orden generado
      this.orden = res2.response!;

      SweetAlert.stopLoading();
    });
  }


  obtenerMaterialesDeficit(){
    SweetAlert.startLoading();
    this.api.obtenerMaterialesDeficit(this.idCategoriaSeleccionado).subscribe(r=>{
      if(r.success){
        this.materiales = r.response!;
        SweetAlert.stopLoading();
      }else{
        Swal.fire({
          allowOutsideClick:false,
          icon: 'error',
          title:'Error al obtener datos',
          text:r.message,
        });
      }
    },(err=>{
      console.log(err);
      if(err.name=="HttpErrorResponse"){
        console.log(err.message);
        Swal.fire({
          allowOutsideClick:false,
          icon: 'error',
          title:'Error al obtener datos',
          text:'Error de comunicación con el servidor',
        });
        return;
      }
      Swal.fire({
        allowOutsideClick:false,
        icon: 'error',
        title:err.name,
        text:err.message,
      });
    }));
  }

  agregarMaterialesRequeridos(){
    var listaAux = this.materiales.filter((mat)=>mat.seleccionado);
    
    for (let i = 0; i < listaAux.length; i++) {
      var existe=false;
      for (let j = 0; j < this.materialesRequeridos.length; j++) {
        if(listaAux[i].codigoMaterial == this.materialesRequeridos[j].codigoMaterial){
          existe = true;
          break;
        }
      }
      if(!existe){
        this.materialesRequeridos.push(listaAux[i]);
      }
    }
  }

  registrar(){
    Swal.fire({
      title: 'Confirmación',
      text: `Usted va a generar la Orden nro ${this.orden.idOrden}, ¿Desea continuar? `,
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
        
        this.orden.idSolicitante = this.user.idTrabajador;
        this.orden.concepto = this.concepto;
        this.orden.estado = this.estado;
        this.orden.idArea = this.user.idArea;
        this.orden.detalles = [];
        
        this.materialesRequeridos.forEach(mr=>{
          this.orden.detalles.push({idOrden:this.orden.idOrden,codigoMaterial:mr.codigoMaterial,cantidadRequerida:(mr.limite - mr.stock)});
        });
        
        this.orden.nroItems = this.orden.detalles.length;

        this.api.registrarNuevaOrden(this.orden).subscribe(r => {
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

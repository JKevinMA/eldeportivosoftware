import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Trabajador } from 'src/app/models/trabajador';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:Trabajador = new Trabajador();

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    if(this.api.estaAutenticado()){
      this.router.navigateByUrl("inicio");
    }
  }

  login(formulario:NgForm){
    console.log(formulario);
    if(formulario.invalid) return;

    Swal.fire({
      allowOutsideClick:false,
      icon: 'info',
      title:'Login',
      text:'Ingresando...',
    });

    Swal.showLoading();

    this.api.login(this.user).subscribe(r=>{
      if(r.success){
        if(r.response == null){
          Swal.fire({
            allowOutsideClick:false,
            icon: 'error',
            title:'Error al ingresar',
            text:'Usuario no existe o credenciales invalidas',
          });
        }else{
          Swal.close();
          window.location.reload();
          /* if (r.response.idRol==1) {
            this.router.navigate(['/inicio/orden-reposicion']);
          }else if(r.response.idRol==2){
            this.router.navigate(['/inicio/orden-reposicion']);
          } */

        }
      }else if(!r.success){
        Swal.fire({
          allowOutsideClick:false,
          icon: 'error',
          title:'Error al ingresar',
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
          title:'Error al ingresar',
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

}

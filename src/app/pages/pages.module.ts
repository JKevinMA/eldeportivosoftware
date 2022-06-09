import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { Error404Component } from './error404/error404.component';
import { SectionsModule } from '../sections/sections.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    InicioComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    SectionsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    LoginComponent,
    InicioComponent,
    Error404Component
  ]
})
export class PagesModule { }

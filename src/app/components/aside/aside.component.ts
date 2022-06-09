import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Trabajador } from 'src/app/models/trabajador';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  user:Trabajador;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.user= this.api.obtenerUsuario();
  }

}

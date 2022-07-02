import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { FichaES } from 'src/app/models/ficha-E-S';
import { OrdenConfeccion } from 'src/app/models/orden-confeccion';
import { OrdenPedido } from 'src/app/models/orden-pedido';
import { Trabajador } from 'src/app/models/trabajador';
import { SweetAlert } from 'src/app/utils/sweet-alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-orden-confeccion',
  templateUrl: './generar-orden-confeccion.component.html',
  styleUrls: ['./generar-orden-confeccion.component.css']
})
export class GenerarOrdenConfeccionComponent implements OnInit {

  ordenesPedidosTotales: OrdenPedido[] = [];
  ordenesPedidosFiltrados: OrdenPedido[] = [];
  fichasESTotales: FichaES[] = [];
  fichasESFiltrados: FichaES[] = [];
  ordenConfeccion: OrdenConfeccion = new OrdenConfeccion();
  ordenPedido: OrdenPedido = new OrdenPedido();
  fichaES: FichaES = new FichaES();

  busqueda: string = '';
  busquedaFicha: string = '';

  tipoProduccionParcial = false;
  tipoProduccionCompleta = true;

  readonly estadoOrdenesPedido = 'Pendiente de fabricacion';
  readonly estadoFichasES = 'Generado';
  readonly fecha = new Date().toISOString().substring(0, 10);
  readonly prefijo = 'OCF';
  constructor(private api: ApiService) { }

  user: Trabajador;

  ngOnInit(): void {
    this.cargarControles();
    this.user = this.api.obtenerUsuario();
  }
  cargarControles() {
    SweetAlert.startLoading();
    combineLatest(
      this.api.obtenerOrdenesPedidos("-", this.estadoOrdenesPedido),
      this.api.obtenerNuevoNroOrdenConfeccion(this.prefijo),
      this.api.obtenerFichasES("-", this.estadoFichasES),
    ).subscribe(([res1, res2, res3]) => {
      console.log(res3);
      if (res1.success) {
        this.ordenesPedidosTotales = res1.response!;
        this.ordenesPedidosFiltrados = this.ordenesPedidosTotales;
      }
      if (res2.success) {
        this.ordenConfeccion = res2.response!;
      }
      if (res3.success) {
        this.fichasESTotales = res3.response!;
        this.fichasESFiltrados = this.fichasESTotales;
      }
      SweetAlert.stopLoading();
    });
  }

  buscarOrdenPedido() {
    if (this.busqueda.trim().length == 0) {
      this.ordenesPedidosFiltrados = this.ordenesPedidosTotales;
    } else {
      this.ordenesPedidosFiltrados = this.ordenesPedidosTotales.filter(pt => pt.idOrdenPedido.toLowerCase().includes(this.busqueda.toLowerCase()));
    }
  }

  buscarFichaES() {
    if (this.busquedaFicha.trim().length == 0) {
      this.fichasESFiltrados = this.fichasESTotales;
    } else {
      this.fichasESFiltrados = this.fichasESTotales.filter(pt => pt.idFichaES.toLowerCase().includes(this.busquedaFicha.toLowerCase()));
    }
  }

  agregarOrdenPedido() {
    var c = 0;
    this.ordenesPedidosFiltrados.forEach(p => {
      if (p.seleccionado) {
        c++;
      }
    });
    if (c > 1) {
      Swal.fire('Alerta', 'Se solicita que solo seleccione una fila correspondiente.', 'warning');
    }
    if (c == 1) {
      this.ordenesPedidosFiltrados.forEach(p => {
        if (p.seleccionado) {
          this.ordenPedido = p;
        }
      });
    }
  }

  agregarFichaES() {
    var c = 0;
    this.fichasESFiltrados.forEach(p => {
      if (p.seleccionado) {
        c++;
      }
    });
    if (c > 1) {
      Swal.fire('Alerta', 'Se solicita que solo seleccione una fila correspondiente.', 'warning');
    }
    if (c == 1) {
      this.fichasESFiltrados.forEach(p => {
        if (p.seleccionado) {
          this.fichaES = p;
        }
      });
    }
  }

  registrar() {

    Swal.fire({
      title: 'Confirmación',
      text: `Usted va a generar la Orden de confeccion nro ${this.ordenConfeccion.idOrdenConfeccion}, ¿Desea continuar? `,
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
        this.ordenConfeccion.idOrdenPedido = this.ordenPedido.idOrdenPedido;
        this.ordenConfeccion.idFichaES = this.fichaES.idFichaES;
        this.ordenConfeccion.tipoProduccion = '';
        if (this.tipoProduccionCompleta) {
          this.ordenConfeccion.tipoProduccion = 'Produccion Completa';
        } else if (this.tipoProduccionParcial) {
          this.ordenConfeccion.tipoProduccion = 'Produccion Parcial';
        }
        this.ordenConfeccion.estado = 'Generado';
        this.ordenConfeccion.idTrabajador = this.user.idTrabajador;

        this.ordenConfeccion.detalles = [];
        this.ordenPedido.detalles.forEach(d => {
          this.ordenConfeccion.detalles.push({idOrdenConfeccion:this.ordenConfeccion.idOrdenConfeccion,
            idCotizacion: d.idCotizacion, idPrenda: d.idPrenda, codigoMaterial: d.codigoMaterial, idTalla: d.idTalla, idDetalleDiseno: d.idDetalleDiseno, cantidadFabricar: d.cantidadFabricar
          });
        });

        this.api.registrarNuevaOrdenConfeccion(this.ordenConfeccion).subscribe(r => {
          if (r.success) {
            if (r.response! > 0) {
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

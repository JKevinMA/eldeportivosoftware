import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarSolicitudCotizacionProveedorComponent } from './generar-solicitud-cotizacion-proveedor.component';

describe('GenerarSolicitudCotizacionProveedorComponent', () => {
  let component: GenerarSolicitudCotizacionProveedorComponent;
  let fixture: ComponentFixture<GenerarSolicitudCotizacionProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarSolicitudCotizacionProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarSolicitudCotizacionProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

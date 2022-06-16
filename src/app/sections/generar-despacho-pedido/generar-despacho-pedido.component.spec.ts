import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarDespachoPedidoComponent } from './generar-despacho-pedido.component';

describe('GenerarDespachoPedidoComponent', () => {
  let component: GenerarDespachoPedidoComponent;
  let fixture: ComponentFixture<GenerarDespachoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarDespachoPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarDespachoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

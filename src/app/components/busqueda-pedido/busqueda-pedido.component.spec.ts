import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPedidoComponent } from './busqueda-pedido.component';

describe('BusquedaPedidoComponent', () => {
  let component: BusquedaPedidoComponent;
  let fixture: ComponentFixture<BusquedaPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

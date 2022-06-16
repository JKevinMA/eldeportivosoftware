import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarEntregaMaterialFabricacionComponent } from './generar-entrega-material-fabricacion.component';

describe('GenerarEntregaMaterialFabricacionComponent', () => {
  let component: GenerarEntregaMaterialFabricacionComponent;
  let fixture: ComponentFixture<GenerarEntregaMaterialFabricacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarEntregaMaterialFabricacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarEntregaMaterialFabricacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

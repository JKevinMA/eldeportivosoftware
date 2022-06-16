import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarFichaESMaterialComponent } from './generar-ficha-e-s-material.component';

describe('GenerarFichaESMaterialComponent', () => {
  let component: GenerarFichaESMaterialComponent;
  let fixture: ComponentFixture<GenerarFichaESMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarFichaESMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarFichaESMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

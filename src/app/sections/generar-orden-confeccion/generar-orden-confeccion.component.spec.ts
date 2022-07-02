import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarOrdenConfeccionComponent } from './generar-orden-confeccion.component';

describe('GenerarOrdenConfeccionComponent', () => {
  let component: GenerarOrdenConfeccionComponent;
  let fixture: ComponentFixture<GenerarOrdenConfeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarOrdenConfeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarOrdenConfeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

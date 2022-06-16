import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarGuiaRemisionComponent } from './generar-guia-remision.component';

describe('GenerarGuiaRemisionComponent', () => {
  let component: GenerarGuiaRemisionComponent;
  let fixture: ComponentFixture<GenerarGuiaRemisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarGuiaRemisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarGuiaRemisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

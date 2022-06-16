import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudMaterialesSuministroComponent } from './solicitud-materiales-suministro.component';

describe('SolicitudMaterialesSuministroComponent', () => {
  let component: SolicitudMaterialesSuministroComponent;
  let fixture: ComponentFixture<SolicitudMaterialesSuministroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudMaterialesSuministroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudMaterialesSuministroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

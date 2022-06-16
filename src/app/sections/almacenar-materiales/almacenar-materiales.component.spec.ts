import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenarMaterialesComponent } from './almacenar-materiales.component';

describe('AlmacenarMaterialesComponent', () => {
  let component: AlmacenarMaterialesComponent;
  let fixture: ComponentFixture<AlmacenarMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmacenarMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenarMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionCompraComponent } from './recepcion-compra.component';

describe('RecepcionCompraComponent', () => {
  let component: RecepcionCompraComponent;
  let fixture: ComponentFixture<RecepcionCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarOrdenReposicionComponent } from './generar-orden-reposicion.component';

describe('GenerarOrdenReposicionComponent', () => {
  let component: GenerarOrdenReposicionComponent;
  let fixture: ComponentFixture<GenerarOrdenReposicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarOrdenReposicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarOrdenReposicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

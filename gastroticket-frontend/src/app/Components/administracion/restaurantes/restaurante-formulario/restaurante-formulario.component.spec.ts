import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteFormularioComponent } from './restaurante-formulario.component';

describe('RestauranteFormularioComponent', () => {
  let component: RestauranteFormularioComponent;
  let fixture: ComponentFixture<RestauranteFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestauranteFormularioComponent]
    });
    fixture = TestBed.createComponent(RestauranteFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

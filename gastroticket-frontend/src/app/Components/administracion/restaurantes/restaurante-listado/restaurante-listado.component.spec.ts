import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteListadoComponent } from './restaurante-listado.component';

describe('RestauranteListadoComponent', () => {
  let component: RestauranteListadoComponent;
  let fixture: ComponentFixture<RestauranteListadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestauranteListadoComponent]
    });
    fixture = TestBed.createComponent(RestauranteListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

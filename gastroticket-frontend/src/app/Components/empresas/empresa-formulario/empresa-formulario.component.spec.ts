import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaFormularioComponent } from './empresa-formulario.component';

describe('EmpresaFormularioComponent', () => {
  let component: EmpresaFormularioComponent;
  let fixture: ComponentFixture<EmpresaFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaFormularioComponent]
    });
    fixture = TestBed.createComponent(EmpresaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

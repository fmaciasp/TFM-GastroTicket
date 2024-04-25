import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEmpresasComponent } from './dash-empresas.component';

describe('DashEmpresasComponent', () => {
  let component: DashEmpresasComponent;
  let fixture: ComponentFixture<DashEmpresasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashEmpresasComponent]
    });
    fixture = TestBed.createComponent(DashEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

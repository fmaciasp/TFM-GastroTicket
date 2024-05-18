import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEmpleadoComponent } from './dash-empleado.component';

describe('DashEmpleadoComponent', () => {
  let component: DashEmpleadoComponent;
  let fixture: ComponentFixture<DashEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashEmpleadoComponent]
    });
    fixture = TestBed.createComponent(DashEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

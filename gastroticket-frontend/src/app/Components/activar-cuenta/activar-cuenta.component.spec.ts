import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarCuentaComponent } from './activar-cuenta.component';

describe('ActivarCuentaComponent', () => {
  let component: ActivarCuentaComponent;
  let fixture: ComponentFixture<ActivarCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivarCuentaComponent]
    });
    fixture = TestBed.createComponent(ActivarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

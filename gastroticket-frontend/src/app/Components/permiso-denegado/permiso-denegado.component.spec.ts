import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoDenegadoComponent } from './permiso-denegado.component';

describe('PermisoDenegadoComponent', () => {
  let component: PermisoDenegadoComponent;
  let fixture: ComponentFixture<PermisoDenegadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermisoDenegadoComponent]
    });
    fixture = TestBed.createComponent(PermisoDenegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

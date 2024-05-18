import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCuponComponent } from './dialog-cupon.component';

describe('DialogCuponComponent', () => {
  let component: DialogCuponComponent;
  let fixture: ComponentFixture<DialogCuponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCuponComponent]
    });
    fixture = TestBed.createComponent(DialogCuponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCanjearComponent } from './dialog-canjear.component';

describe('DialogCanjearComponent', () => {
  let component: DialogCanjearComponent;
  let fixture: ComponentFixture<DialogCanjearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCanjearComponent]
    });
    fixture = TestBed.createComponent(DialogCanjearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

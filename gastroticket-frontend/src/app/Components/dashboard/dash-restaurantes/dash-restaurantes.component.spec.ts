import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashRestaurantesComponent } from './dash-restaurantes.component';

describe('DashRestaurantesComponent', () => {
  let component: DashRestaurantesComponent;
  let fixture: ComponentFixture<DashRestaurantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashRestaurantesComponent]
    });
    fixture = TestBed.createComponent(DashRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

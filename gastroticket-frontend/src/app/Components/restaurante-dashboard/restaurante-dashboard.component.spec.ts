import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteDashboardComponent } from './restaurante-dashboard.component';

describe('RestauranteDashboardComponent', () => {
  let component: RestauranteDashboardComponent;
  let fixture: ComponentFixture<RestauranteDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestauranteDashboardComponent]
    });
    fixture = TestBed.createComponent(RestauranteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

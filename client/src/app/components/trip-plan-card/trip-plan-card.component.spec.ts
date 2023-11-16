import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPlanCardComponent } from './trip-plan-card.component';

describe('TripPlanCardComponent', () => {
  let component: TripPlanCardComponent;
  let fixture: ComponentFixture<TripPlanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripPlanCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripPlanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

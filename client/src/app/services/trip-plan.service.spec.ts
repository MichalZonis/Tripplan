import { TestBed } from '@angular/core/testing';

import { TripPlanService } from './trip-plan.service';

describe('TripPlanService', () => {
  let service: TripPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTrackerWorkoutFormComponent } from './health-tracker-workout-form.component';

describe('HealthTrackerWorkoutFormComponent', () => {
  let component: HealthTrackerWorkoutFormComponent;
  let fixture: ComponentFixture<HealthTrackerWorkoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthTrackerWorkoutFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthTrackerWorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HealthTrackerWorkoutFormComponent } from './health-tracker-workout-form.component';
import { WorkoutService } from '../Services/workout.service';

describe('HealthTrackerWorkoutFormComponent', () => {
  let component: HealthTrackerWorkoutFormComponent;
  let fixture: ComponentFixture<HealthTrackerWorkoutFormComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const workoutServiceSpy = jasmine.createSpyObj('WorkoutService', [
      'addWorkout',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HealthTrackerWorkoutFormComponent],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthTrackerWorkoutFormComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(
      WorkoutService
    ) as jasmine.SpyObj<WorkoutService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addWorkout and navigate on valid form submission', () => {
    const mockWorkout = {
      name: 'John Doe',
      workouts: 'Running',
      numberOfWorkouts: 1,
      totalWorkoutMinutes: 30,
    };

    component.workoutForm.setValue({
      username: 'John Doe',
      workoutType: 'Running',
      workoutMinutes: 30,
    });

    component.onSubmit();

    expect(workoutService.addWorkout).toHaveBeenCalledWith(mockWorkout);
    expect(router.navigate).toHaveBeenCalledWith(['/workout-list']);
  });

  it('should not call addWorkout if form is invalid', () => {
    component.workoutForm.setValue({
      username: '',
      workoutType: '',
      workoutMinutes: null,
    });

    component.onSubmit();

    expect(workoutService.addWorkout).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});

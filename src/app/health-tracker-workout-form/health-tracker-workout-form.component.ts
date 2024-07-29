import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Workout, WorkoutService } from '../Services/workout.service';

@Component({
  selector: 'app-health-tracker-workout-form',
  templateUrl: './health-tracker-workout-form.component.html',
  styleUrls: ['./health-tracker-workout-form.component.css'],
})
export class HealthTrackerWorkoutFormComponent implements OnInit {
  workoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private router: Router
  ) {
    this.workoutForm = this.fb.group({
      username: ['', Validators.required],
      workoutType: ['', Validators.required],
      workoutMinutes: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const { username, workoutType, workoutMinutes } = this.workoutForm.value;
      const workout: Workout = {
        name: username,
        workouts: workoutType,
        numberOfWorkouts: 1,
        totalWorkoutMinutes: workoutMinutes,
      };
      this.workoutService.addWorkout(workout);
      this.workoutForm.reset();
      this.router.navigate(['/workout-list']);
    }
  }
}

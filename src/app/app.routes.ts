import { Routes } from '@angular/router';
import { HealthTrackerWorkoutFormComponent } from './health-tracker-workout-form/health-tracker-workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';

export const routes: Routes = [
  { path: 'add-workout', component: HealthTrackerWorkoutFormComponent },
  { path: 'workout-list', component: WorkoutListComponent },
  { path: '', redirectTo: '/add-workout', pathMatch: 'full' },
  { path: '**', redirectTo: '/workouts' },
];

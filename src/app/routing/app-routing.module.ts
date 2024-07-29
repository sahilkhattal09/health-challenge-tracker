import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutListComponent } from '../workout-list/workout-list.component';
import { HealthTrackerWorkoutFormComponent } from '../health-tracker-workout-form/health-tracker-workout-form.component';

const routes: Routes = [
  { path: 'add-workout', component: HealthTrackerWorkoutFormComponent },
  { path: 'workout-list', component: WorkoutListComponent },
  { path: '', redirectTo: '/add-workout', pathMatch: 'full' },
  { path: '**', redirectTo: '/workout-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

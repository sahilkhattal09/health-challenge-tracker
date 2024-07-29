import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HealthTrackerWorkoutFormComponent } from './health-tracker-workout-form/health-tracker-workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { routes } from './app.routes'; // Import routes from app.routes.ts
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HealthTrackerWorkoutFormComponent,
    WorkoutListComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Configure routing
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

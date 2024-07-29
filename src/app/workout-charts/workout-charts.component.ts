import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent {
  @Output() userSelected = new EventEmitter<any>();

  paginatedWorkouts = [
    {
      name: 'John Doe',
      workouts: 'Cycling',
      numberOfWorkouts: 10,
      totalWorkoutMinutes: 120,
    },
    {
      name: 'Jane Smith',
      workouts: 'Running',
      numberOfWorkouts: 8,
      totalWorkoutMinutes: 90,
    },
    {
      name: 'Mike Johnson',
      workouts: 'Swimming',
      numberOfWorkouts: 5,
      totalWorkoutMinutes: 150,
    },
    // more workouts
  ];

  onRowClick(workout: any) {
    this.userSelected.emit(workout);
  }
}

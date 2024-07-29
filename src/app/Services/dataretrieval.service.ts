import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor() {}

  getWorkouts(): any[] {
    const workouts = localStorage.getItem('workouts');
    return workouts ? JSON.parse(workouts) : [];
  }
}

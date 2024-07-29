import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Workout {
  name: string;
  workouts: string;
  numberOfWorkouts: number;
  totalWorkoutMinutes: number;
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly storageKey = 'workouts';
  private workoutsSubject: BehaviorSubject<Workout[]>;
  private filteredWorkoutsSubject: BehaviorSubject<Workout[]>;
  private searchQuery = '';
  private filterType = 'All';
  private currentPage = 1;
  private itemsPerPage = 5;

  constructor() {
    const storedWorkouts = localStorage.getItem(this.storageKey);
    const workouts = storedWorkouts ? JSON.parse(storedWorkouts) : [];
    this.workoutsSubject = new BehaviorSubject<Workout[]>(workouts);
    this.filteredWorkoutsSubject = new BehaviorSubject<Workout[]>(workouts);
  }

  getWorkouts(): Observable<Workout[]> {
    return this.filteredWorkoutsSubject.asObservable();
  }

  addWorkout(workout: Workout): void {
    const currentWorkouts = this.workoutsSubject.value;
    const updatedWorkouts = [...currentWorkouts, workout];
    this.workoutsSubject.next(updatedWorkouts);
    this.updateLocalStorage(updatedWorkouts);
    this.filterWorkouts();
  }

  setFilterType(type: string): void {
    this.filterType = type;
    this.filterWorkouts();
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query;
    this.filterWorkouts();
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    this.updateFilteredWorkouts();
  }

  setItemsPerPage(count: number): void {
    this.itemsPerPage = count;
    this.updateFilteredWorkouts();
  }

  private filterWorkouts(): void {
    const filtered = this.workoutsSubject.value.filter(
      (workout) =>
        (this.filterType === 'All' ||
          workout.workouts.includes(this.filterType)) &&
        workout.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.filteredWorkoutsSubject.next(filtered);
    this.updateFilteredWorkouts();
  }

  private updateFilteredWorkouts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const paginated = this.filteredWorkoutsSubject.value.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
    this.filteredWorkoutsSubject.next(paginated);
  }

  private updateLocalStorage(workouts: Workout[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(workouts));
  }

  getTotalPages(): number {
    return Math.ceil(
      this.filteredWorkoutsSubject.value.length / this.itemsPerPage
    );
  }
}

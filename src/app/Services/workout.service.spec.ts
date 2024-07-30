import { TestBed } from '@angular/core/testing';
import { WorkoutService, Workout } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);

    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with workouts from localStorage', () => {
    const mockWorkouts: Workout[] = [
      {
        name: 'John Doe',
        workouts: 'Running',
        numberOfWorkouts: 1,
        totalWorkoutMinutes: 30,
      },
      {
        name: 'Jane Doe',
        workouts: 'Cycling',
        numberOfWorkouts: 2,
        totalWorkoutMinutes: 45,
      },
    ];
    localStorage.setItem('workouts', JSON.stringify(mockWorkouts));

    service = TestBed.inject(WorkoutService);

    service.getWorkouts().subscribe((workouts) => {
      expect(workouts).toEqual(mockWorkouts);
    });
  });

  it('should add a new workout and update localStorage', () => {
    const newWorkout: Workout = {
      name: 'Alice',
      workouts: 'Swimming',
      numberOfWorkouts: 1,
      totalWorkoutMinutes: 20,
    };

    service.addWorkout(newWorkout);

    service.getWorkouts().subscribe((workouts) => {
      expect(workouts).toContain(newWorkout);
      const storedWorkouts = JSON.parse(
        localStorage.getItem('workouts') || '[]'
      );
      expect(storedWorkouts).toContain(newWorkout);
    });
  });

  it('should filter workouts by type and search query', () => {
    const mockWorkouts: Workout[] = [
      {
        name: 'John Doe',
        workouts: 'Running',
        numberOfWorkouts: 1,
        totalWorkoutMinutes: 30,
      },
      {
        name: 'Jane Doe',
        workouts: 'Cycling',
        numberOfWorkouts: 2,
        totalWorkoutMinutes: 45,
      },
    ];
    localStorage.setItem('workouts', JSON.stringify(mockWorkouts));
    service = TestBed.inject(WorkoutService);

    service.setFilterType('Running');
    service.setSearchQuery('John');

    service.getWorkouts().subscribe((workouts) => {
      expect(workouts).toEqual([mockWorkouts[0]]);
    });
  });

  it('should handle pagination correctly', () => {
    const mockWorkouts: Workout[] = Array.from({ length: 12 }, (_, i) => ({
      name: `User ${i + 1}`,
      workouts: 'Running',
      numberOfWorkouts: 1,
      totalWorkoutMinutes: 30,
    }));
    localStorage.setItem('workouts', JSON.stringify(mockWorkouts));
    service = TestBed.inject(WorkoutService);

    service.setItemsPerPage(5);
    service.setCurrentPage(2);

    service.getWorkouts().subscribe((workouts) => {
      expect(workouts.length).toBe(5);
      expect(workouts[0].name).toBe('User 6');
      expect(workouts[4].name).toBe('User 10');
    });
  });

  it('should calculate total pages correctly', () => {
    const mockWorkouts: Workout[] = Array.from({ length: 12 }, (_, i) => ({
      name: `User ${i + 1}`,
      workouts: 'Running',
      numberOfWorkouts: 1,
      totalWorkoutMinutes: 30,
    }));
    localStorage.setItem('workouts', JSON.stringify(mockWorkouts));
    service = TestBed.inject(WorkoutService);

    service.setItemsPerPage(5);

    expect(service.getTotalPages()).toBe(3);
  });

  it('should handle setting filter type and search query', () => {
    const mockWorkouts: Workout[] = [
      {
        name: 'John Doe',
        workouts: 'Running',
        numberOfWorkouts: 1,
        totalWorkoutMinutes: 30,
      },
      {
        name: 'Jane Doe',
        workouts: 'Cycling',
        numberOfWorkouts: 2,
        totalWorkoutMinutes: 45,
      },
    ];
    localStorage.setItem('workouts', JSON.stringify(mockWorkouts));
    service = TestBed.inject(WorkoutService);

    service.setFilterType('Cycling');
    service.setSearchQuery('Jane');

    service.getWorkouts().subscribe((workouts) => {
      expect(workouts).toEqual([mockWorkouts[1]]);
    });
  });
});

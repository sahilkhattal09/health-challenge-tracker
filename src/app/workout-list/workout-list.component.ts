import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../Services/dataretrieval.service';
import { Chart, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit {
  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  paginatedWorkouts: any[] = [];
  searchQuery: string = '';
  filterQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;
  selectedWorkout: any;
  cdr: any;

  chart: Chart<'bar'> | undefined;
  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workouts = this.workoutService.getWorkouts();
    this.filteredWorkouts = this.workouts;
    this.updatePagination();
    this.paginatedWorkouts = this.workoutService.getWorkouts();
  }

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Minutes',
        data: [],
      },
    ],
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} minutes`;
          },
        },
      },
    },
  };

  showWorkoutGraph(workoutName: string) {
    // Fetch workout data from the service
    const workouts = this.workoutService.getWorkouts();
    this.selectedWorkout = workouts.find(
      (workout) => workout.name === workoutName
    );

    if (this.selectedWorkout) {
      // Prepare the chart data
      this.chartData.labels = [this.selectedWorkout.name];
      this.chartData.datasets[0].data = [
        this.selectedWorkout.totalWorkoutMinutes,
      ];
      this.cdr.detectChanges();
    }
  }

  onSearch() {
    this.filteredWorkouts = this.workouts.filter(
      (workout) =>
        workout.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        workout.workouts.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  applyFilters() {
    if (this.filterQuery) {
      this.filteredWorkouts = this.workouts.filter(
        (workout) =>
          workout.workouts.toLowerCase() === this.filterQuery.toLowerCase()
      );
    } else {
      this.filteredWorkouts = this.workouts;
    }
    this.currentPage = 1;
    this.updatePagination();
  }
  updatePagination() {
    console.log('Updating pagination...');
    const totalItems = this.filteredWorkouts.length;
    console.log(`Total items: ${totalItems}`);

    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    console.log(`Total pages: ${this.totalPages}`);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log(`Showing items from index ${startIndex} to ${endIndex}`);

    this.paginatedWorkouts = this.filteredWorkouts.slice(startIndex, endIndex);
    console.log('Paginated workouts:', this.paginatedWorkouts);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
}

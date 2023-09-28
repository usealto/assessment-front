import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsGlobalPerformanceComponent } from './components/global-performance/statistics-global-performance/statistics-global-performance.component';
import { StatisticsGlobalEngagementComponent } from './components/statistics-global-engagement/statistics-global-engagement.component';
import { StatisticsPerTeamsComponent } from './components/statistics-per-teams/statistics-per-teams.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    children: [
      {
        path: '',
        component: StatisticsGlobalPerformanceComponent,
      },
      {
        path: 'performance',
        component: StatisticsGlobalPerformanceComponent,
      },
      {
        path: 'engagement',
        component: StatisticsGlobalEngagementComponent,
      },
      {
        path: 'teams',
        component: StatisticsPerTeamsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}

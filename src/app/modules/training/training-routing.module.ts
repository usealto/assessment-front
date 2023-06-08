import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingComponent } from './components/training/training.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingComponent,
  },
  // {
  //   path: '',
  //   component: TrainingHomeComponent,
  // },
  // {
  //   path: AltoRoutes.trainingSession,
  //   component: TrainingComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}

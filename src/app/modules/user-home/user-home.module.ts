import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserHomeRoutingModule } from './user-home-routing.module';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { SharedModule } from '../shared/shared.module';
import { UserHomeStatisticsComponent } from './components/statistics/user-home-statistics.component';

@NgModule({
  declarations: [UserHomeComponent, UserHomeStatisticsComponent],
  imports: [CommonModule, UserHomeRoutingModule, SharedModule],
})
export class UserHomeModule {}

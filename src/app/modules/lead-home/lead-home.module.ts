import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LeadHomeComponent } from './components/lead-home/lead-home.component';
import { LeadHomeRoutingModule } from './lead-home-routing.module';
import { LeadHomeStatisticsComponent } from './components/statistics/lead-home-statistics.component';
import { LeadHomeScoreGraphComponent } from './components/lead-home-score-graph/lead-home-score-graph.component';
import { ChartsModule } from '../charts/charts.module';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from 'src/app/core/store/root/root.reducer';

@NgModule({
  declarations: [LeadHomeComponent, LeadHomeStatisticsComponent, LeadHomeScoreGraphComponent],
  imports: [
    CommonModule,
    LeadHomeRoutingModule,
    ChartsModule,
    SharedModule,
    StoreModule.forRoot({ leadStore: rootReducer }),
  ],
  providers: [TitleCasePipe],
})
export class LeadHomeModule {}

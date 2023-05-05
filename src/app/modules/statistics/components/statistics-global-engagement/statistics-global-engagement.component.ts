import { Component } from '@angular/core';
import { I18ns } from 'src/app/core/utils/i18n/I18n';
import { TeamStore } from 'src/app/modules/lead-team/team.store';

@Component({
  selector: 'alto-statistics-global-engagement',
  templateUrl: './statistics-global-engagement.component.html',
  styleUrls: ['./statistics-global-engagement.component.scss'],
})
export class StatisticsGlobalEngagementComponent {
  I18ns = I18ns;
  timePicker = '';

  constructor(public readonly teamStore: TeamStore) {}

  updateTimePicker(event: any): void {
    console.log(event.target.id);
    this.timePicker = event.target.id;
  }
}

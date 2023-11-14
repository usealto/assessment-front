import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { I18ns } from 'src/app/core/utils/i18n/I18n';
import { DataForTable } from '../../../models/statistics.model';
import { AltoRoutes } from 'src/app/modules/shared/constants/routes';

@Component({
  selector: 'alto-per-teams-table',
  templateUrl: './per-teams-table.component.html',
  styleUrls: ['./per-teams-table.component.scss'],
})
export class PerTeamsTableComponent implements OnChanges {
  I18ns = I18ns;
  AltoRoutes = AltoRoutes;

  @Input() data: DataForTable[] = [];
  @Input() type!: 'team' | 'user';

  pageSize = 5;
  page = 1;
  displayedData: DataForTable[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.paginate(1);
    }
  }

  paginate(page: number) {
    this.page = page;
    this.displayedData = this.data.slice((page - 1) * this.pageSize, page * this.pageSize);
  }
}

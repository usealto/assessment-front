import { getLocaleDateFormat } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChallengeDtoApiStatusEnumApi } from '@usealto/sdk-ts-angular';
import { format } from 'date-fns';
import { ToastService } from 'src/app/core/toast/toast.service';
import { EmojiName } from 'src/app/core/utils/emoji/data';
import { I18ns } from 'src/app/core/utils/i18n/I18n';
import { TeamStore } from 'src/app/modules/lead-team/team.store';
import { ProfileStore } from 'src/app/modules/profile/profile.store';
import { UsersRestService } from 'src/app/modules/profile/services/users-rest.service';
import { ProgramsStore } from 'src/app/modules/programs/programs.store';
import { ProgramsRestService } from 'src/app/modules/programs/services/programs-rest.service';
import { AltoRoutes } from 'src/app/modules/shared/constants/routes';
import { buildTime } from 'src/build-time';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'alto-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  EmojiName = EmojiName;
  I18ns = I18ns;
  buildTime = buildTime;
  AltoRoutes = AltoRoutes;
  isDev = !environment.production;
  ChallengeDtoApiStatusEnumApi = ChallengeDtoApiStatusEnumApi;

  today = format(new Date(), getLocaleDateFormat(this.locale, 0));
  // today = getLocaleDateFormat(this.locale, 0);

  pageSize = 5;

  control = new FormControl(50);

  constructor(
    public readonly teamStore: TeamStore,
    public readonly userStore: ProfileStore,
    public readonly programStore: ProgramsStore,
    userRestService: UsersRestService,
    private readonly toastService: ToastService,
    @Inject(LOCALE_ID) public locale: string,
  ) {
    userRestService.getUsers().subscribe();

    this.toastService.show({
      text: 'Le collaborateur [nom du collaborateur] a bien été modifié',
      type: 'success',
    });
  }
}

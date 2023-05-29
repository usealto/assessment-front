import { Component, OnInit } from '@angular/core';
import { I18ns } from 'src/app/core/utils/i18n/I18n';
import { Router } from '@angular/router';
import { AltoRoutes } from 'src/app/modules/shared/constants/routes';
import { UserDtoApiRolesEnumApi } from '@usealto/sdk-ts-angular';
import { ProfileStore } from 'src/app/modules/profile/profile.store';
@Component({
  selector: 'alto-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  AltoRoutes = AltoRoutes;
  I18ns = I18ns;

  isAdmin = false;
  displayAdmin = false;

  leadRoute = ['/', AltoRoutes.lead, AltoRoutes.leadHome];
  userRoute = ['/', AltoRoutes.user, AltoRoutes.userHome];

  constructor(public readonly userStore: ProfileStore, private readonly router: Router) {}

  ngOnInit(): void {
    const segments = window.location.pathname.split('/');
    const { roles } = this.userStore.user.value;
    if (
      roles.some((r) => r === UserDtoApiRolesEnumApi.AltoAdmin || r === UserDtoApiRolesEnumApi.CompanyAdmin)
    ) {
      this.isAdmin = true;
    }

    if (!segments[1]) {
      this.router.navigate(this.isAdmin ? this.leadRoute : this.userRoute);
      this.displayAdmin = this.isAdmin;
    } else {
      this.displayAdmin = !!segments.length && segments[1] === AltoRoutes.lead;
    }
  }
}

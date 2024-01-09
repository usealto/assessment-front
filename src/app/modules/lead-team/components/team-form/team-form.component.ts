import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { PatchTeamDtoApi, ProgramDtoApi, TeamDtoApi, UserDtoApi } from '@usealto/sdk-ts-angular';
import { Observable, combineLatest, filter, of, switchMap, tap } from 'rxjs';
import { IFormBuilder, IFormGroup } from 'src/app/core/form-types';
import { I18ns } from 'src/app/core/utils/i18n/I18n';
import { User } from 'src/app/models/user.model';
import { UsersRestService } from 'src/app/modules/profile/services/users-rest.service';
import { UsersService } from 'src/app/modules/profile/services/users.service';
import { ProgramsRestService } from 'src/app/modules/programs/services/programs-rest.service';
import { ValidationService } from 'src/app/modules/shared/services/validation.service';
import { TeamForm } from '../../model/team.form';
import { TeamsRestService } from '../../services/teams-rest.service';
import { Team } from '../../../../models/team.model';
import { Program } from '../../../../models/program.model';

@Component({
  selector: 'alto-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent implements OnInit {
  I18ns = I18ns;
  @Input() team?: Team;
  @Input() programs: Program[] = [];
  @Input() teamsNames: string[] = [];
  @Input() users: User[] = [];

  private fb: IFormBuilder = this.fob;

  teamForm: IFormGroup<TeamForm> = this.fb.group<TeamForm>({
    name: [
      '',
      [Validators.required, this.validationService.uniqueStringValidation(this.teamsNames, 'nameNotAllowed')],
    ],
    programs: [],
    invitationEmails: [],
  });

  userFilters = { teams: [] as Team[] };
  teamPrograms: Program[] = [];

  constructor(
    public activeOffcanvas: NgbActiveOffcanvas,
    readonly fob: UntypedFormBuilder,
    private readonly userRestService: UsersRestService,
    private readonly userService: UsersService,
    private readonly programService: ProgramsRestService,
    private readonly teamsRestService: TeamsRestService,
    private readonly validationService: ValidationService,
  ) {}

  ngOnInit(): void {
    if (this.team) {
      const teamId = this.team?.id;
      this.teamPrograms = this.programs.filter((program) => program.teamIds.includes(teamId));
      this.userFilters.teams.push(this.team);
      const filteredUsers = this.userService.filterUsers<UserDtoApi[]>(this.users, this.userFilters);
      this.teamForm.patchValue({
        name: this.team.name,
        programs: this.teamPrograms,
        invitationEmails: filteredUsers,
      });
    }

    const teamName = this.team?.name.toLowerCase();
    const index = this.teamsNames.indexOf(teamName ?? '');

    if (teamName) {
      this.teamsNames.splice(index, 1);
    }

    // setTimeout(() => {
    //   if (this.team) {
    //     this.teamsRestService
    //       .getTeam(this.team.id)
    //       .pipe(
    //         tap((d) => {
    //           if (!d.data) {
    //             return;
    //           }
    //           this.team = Team.fromDto(d.data);
    //           this.isEdit = true;
    //           const { name, programs } = d.data;
    //           this.userFilters.teams.push(this.team);
    //           const filteredUsers = this.userService.filterUsers<UserDtoApi[]>(this.users, this.userFilters);

    //           this.teamForm.patchValue({
    //             name,
    //             programs: Program.fromDto(programs as ProgramDtoApi[]),
    //             invitationEmails: filteredUsers,
    //           });
    //         }),
    //       )
    //       .subscribe();
    //   }
    // });
  }

  createTeam() {
    if (!this.teamForm.value) return;

    const { name, programs, invitationEmails } = this.teamForm.value;

    // TODO : un seul pipe
    // A la fin du pipe, lorsqu'un changement a eu lieu (create/update), teamChanged.emit([LA NOUVELLE TEAM/LA TEAM UPDATEE])
    // Le composant parent doit souscrire à teamChanged pour mettre à jour la liste des teams (dans le store) et la liste des programmes

    (this.team
      ? this.teamsRestService.updateTeam({ id: this.team.id, patchTeamDtoApi: { name } })
      : this.teamsRestService.createTeam({ name })
    )
      .pipe(
        switchMap((team: Team) => {
          if (team) {
            return combineLatest(this.updateTeamInfos(team, programs, invitationEmails));
          }
          return of([undefined]);
        }),
      )
      .subscribe({
        next: () => {
          this.activeOffcanvas.close(true);
        },
      });

    // if (!this.isEdit && !this.team) {
    //   //CREATION MODE
    //   this.teamsRestService
    //     .createTeam({ name })
    //     .pipe(
    //       switchMap((team) => {
    //         if (team) {
    //           return combineLatest(this.updateTeamInfos(team, programs, invitationEmails));
    //         }
    //         return of(null);
    //       }),
    //       tap(() => {
    //         this.teamChanged.emit();
    //         this.activeOffcanvas.dismiss();
    //       }),
    //     )
    //     .subscribe();
    // } else {
    //   //EDIT MODE
    //   const params: PatchTeamDtoApi = {
    //     name: name,
    //   };
    //   if (this.team?.id) {
    //     this.teamsRestService
    //       .updateTeam({ id: this.team.id, patchTeamDtoApi: params })
    //       .pipe(
    //         filter((team) => !!team),
    //         switchMap((team) => {
    //           if (team) {
    //             return combineLatest([
    //               ...[of(team)],
    //               ...this.updateTeamInfos(team, programs, invitationEmails),
    //             ]);
    //           }
    //           return of(null);
    //         }),
    //         tap((team) => {
    //           if (team) {
    //             this.teamChanged?.emit(team[0]);
    //           }
    //           this.activeOffcanvas.close();
    //         }),
    //       )
    //       .subscribe();
    //   }
    // }
  }

  updateTeamInfos(team: Team, formProgs: Program[], members: UserDtoApi[]): Observable<any>[] {
    const output$: Observable<any>[] = [of(null)];

    // chopper les programmes et filtrer by team.programIds (à la place de this.team.programs)
    // const initialTeamProgs = (this.teamPrograms || []).reduce((result, program) => {
    //   const longProg = this.programs.find((po) => program.id === po.id);
    //   if (longProg && !result.find((p) => p.id === longProg.id)) {
    //     result.push(longProg);
    //   }
    //   return result;
    // }, [] as ProgramDtoApi[]);

    this.teamPrograms.forEach((p) => {
      if (!formProgs.find((po) => po.id === p.id)) {
        output$.push(
          this.programService.updateProgram(p.id, {
            teamIds: p.teamIds.filter((t) => t !== team.id).map((t) => ({ id: t })),
          }),
        );
      }
    });

    if (formProgs) {
      formProgs.forEach((p) => {
        if (!this.teamPrograms.find((po) => po.id === p.id) && team) {
          // To Add
          output$.push(
            this.programService.updateProgram(p.id, {
              teamIds: [...p.teamIds, team.id].map((t) => ({ id: t })),
            }),
          );
        }
      });
    }

    members?.forEach((member) => {
      if (member.teamId !== team.id) {
        output$.push(this.userRestService.patchUser(member.id, { teamId: team.id }));
      }
    });

    return output$;
  }
}

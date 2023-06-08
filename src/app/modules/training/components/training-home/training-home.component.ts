import { Component, OnInit } from '@angular/core';
import { GetProgramRunsRequestParams, UserDtoApi } from '@usealto/sdk-ts-angular';
import { combineLatest, map, reduce, switchMap, tap } from 'rxjs';
import { I18ns } from 'src/app/core/utils/i18n/I18n';
import { ProfileStore } from 'src/app/modules/profile/profile.store';
import { ProgramRunsRestService } from 'src/app/modules/programs/services/program-runs-rest.service';
import { ProgramsRestService } from 'src/app/modules/programs/services/programs-rest.service';
import { AltoRoutes } from 'src/app/modules/shared/constants/routes';
import { TrainingCardData } from '../../models/training.model';
import { memoize } from 'src/app/core/utils/memoize/memoize';
import { UsersRestService } from 'src/app/modules/profile/services/users-rest.service';

@Component({
  selector: 'alto-training-home',
  templateUrl: './training-home.component.html',
  styleUrls: ['./training-home.component.scss'],
})
export class TrainingHomeComponent implements OnInit {
  I18ns = I18ns;
  AltoRoutes = AltoRoutes;
  activeTab = 1;

  guessesCount = 0;

  myPrograms: TrainingCardData[] = [];
  user = this.userStore.user.value;

  constructor(
    private readonly programRunsRestService: ProgramRunsRestService,
    private readonly programsRestService: ProgramsRestService,
    private readonly userStore: ProfileStore,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.programsRestService.getMyPrograms(),
      this.programRunsRestService.getProgramRunsPaginated({
        createdBy: this.user.id,
      } as GetProgramRunsRequestParams),
    ])
      .pipe(
        map(([programs, programRuns]) => {
          return programs.reduce((output, p) => {
            const progRun = programRuns.data?.filter((x) => x.programId === p.id)[0] || null;

            if (!progRun?.finishedAt) {
              output.push({
                title: p.name,
                score: !progRun ? 0 : (progRun.guessesCount / progRun.questionsCount) * 100,
                updatedAt: progRun?.updatedAt,
                programRunId: progRun?.id,
                programId: p.id,
                isProgress: !progRun?.finishedAt,
                duration: progRun?.questionsCount ? progRun?.questionsCount * 30 : undefined,
              });
            }
            return output;
          }, [] as TrainingCardData[]);
        }),
        tap((arr) => {
          this.myPrograms = arr
            .sort((a, b) => (a.updatedAt?.getTime() ?? 0) - (b.updatedAt?.getTime() ?? 0))
            .reverse();
        }),
        switchMap((arr) =>
          this.programRunsRestService.getProgramRunsPaginated({
            isFinished: true,
            programIds: arr.map((x) => x.programId).join(','),
          }),
        ),
        tap((prs) => {
          this.myPrograms = this.myPrograms.map((pDisp) => ({
            ...pDisp,
            users:
              prs.data?.reduce((result, pr) => {
                const user = this.getUser(pr.createdBy);
                if (pr.programId === pDisp.programId && user && !result.find((u) => u.id === user.id)) {
                  // if (user && !result.find((u) => u.id === user.id)) {
                  result.push(user);
                }
                return result;
              }, [] as UserDtoApi[]) ?? [],
          }));
        }),
        tap(console.log),
      )
      .subscribe();
  }

  switchTab(index: number) {
    this.activeTab = index;
  }

  @memoize()
  getUser(id: string): UserDtoApi | undefined {
    return this.userStore.users.value.find((x) => x.id === id);
  }
}

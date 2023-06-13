import { Injectable } from '@angular/core';
import { addDays } from 'date-fns';
import { Observable, filter, map } from 'rxjs';
import { ChartFilters } from '../../shared/models/chart.model';
import { ScoresService } from './scores.service';
import { ScoreDuration, ScoreFilters } from '../models/score.model';
import {
  ScoresApiService,
  ProgramRunsApiService,
  StatsApiService,
  TeamStatsDtoApi,
  GetTeamsStatsRequestParams,
  ScoresResponseDtoApi,
  GetScoresRequestParams,
  ScoreTypeEnumApi,
  ScoreTimeframeEnumApi,
  ScoreFillValuesEnumApi,
  ScoreByTypeEnumApi,
  ProgramRunApi,
  GetProgramRunsRequestParams,
  GetUsersStatsRequestParams,
  UserStatsDtoApi,
} from '@usealto/sdk-ts-angular';

@Injectable({
  providedIn: 'root',
})
export class ScoresRestService {
  constructor(
    private readonly scoresApi: ScoresApiService,
    private readonly service: ScoresService,
    private readonly programsApi: ProgramRunsApiService,
    private readonly statsApi: StatsApiService,
  ) {}

  getUsersStats(duration: ScoreDuration, isProgression = false): Observable<UserStatsDtoApi[]> {
    let dateAfter: Date;
    let dateBefore: Date;

    if (isProgression) {
      const [start, end] = this.getPreviousPeriod(duration);

      dateAfter = start;
      dateBefore = end;
    } else {
      dateAfter = this.service.getStartDate(duration);
      dateBefore = new Date();
    }

    return this.statsApi
      .getUsersStats({
        from: dateAfter,
        to: dateBefore,
        respondsRegularlyThreshold: 0.42,
      } as GetUsersStatsRequestParams)
      .pipe(map((r) => r.data || []));
  }

  getTeamsStats(duration: ScoreDuration, isProgression = false): Observable<TeamStatsDtoApi[]> {
    let dateAfter: Date;
    let dateBefore: Date;

    if (isProgression) {
      const [start, end] = this.getPreviousPeriod(duration);

      dateAfter = start;
      dateBefore = end;
    } else {
      dateAfter = this.service.getStartDate(duration);
      dateBefore = new Date();
    }

    return this.statsApi
      .getTeamsStats({
        from: dateAfter,
        to: dateBefore,
      } as GetTeamsStatsRequestParams)
      .pipe(map((r) => r.data || []));
  }

  getScores(
    { duration, type, team, timeframe, sortBy, user, ids }: ChartFilters,
    isProgression = false,
  ): Observable<ScoresResponseDtoApi> {
    const par: GetScoresRequestParams = {
      type: type ?? ScoreTypeEnumApi.Guess,
      timeframe: timeframe ?? ScoreTimeframeEnumApi.Day,
      dateAfter: this.service.getStartDate(duration as ScoreDuration),
      dateBefore: new Date(),
      fillValues: ScoreFillValuesEnumApi.Null,
      sortBy,
    };

    if (isProgression) {
      const [start, end] = this.getPreviousPeriod(duration);

      par.dateAfter = start;
      par.dateBefore = end;
    } else {
      // TODO Remove
      par.dateAfter = this.service.getStartDate(duration as ScoreDuration);
      par.dateBefore = new Date();
    }

    if (team) {
      par.scoredBy = ScoreByTypeEnumApi.Team;
      par.scoredById = team;
    } else if (user) {
      par.scoredBy = ScoreByTypeEnumApi.User;
      par.scoredById = user;
    }
    if (ids) {
      par.ids = ids.join(',');
    }

    return this.scoresApi.getScores(par).pipe(
      map((r) => r.data || ({} as ScoresResponseDtoApi)),
      filter((x) => !!x),
    );
  }

  getGeneralScores(req: GetScoresRequestParams): Observable<ScoresResponseDtoApi> {
    const par = {
      ...req,
      type: req?.type ?? ScoreTypeEnumApi.Guess,
      timeframe: req?.timeframe ?? ScoreTimeframeEnumApi.Week,
      dateBefore: new Date(),
    };
    par.dateAfter = this.service.getStartDate(this.service.getDefaultDuration(par.timeframe));

    return this.scoresApi.getScores(par).pipe(
      map((r) => r.data || ({} as ScoresResponseDtoApi)),
      filter((x) => !!x),
    );
  }

  // getProgramScore(req: GetScoresRequestParams): Observable<ScoresResponseDtoApi> {
  //   const par = {
  //     ...req,
  //     type: ScoreTypeEnumApi.Program,
  //     timeframe: req?.timeframe ?? ScoreTimeframeEnumApi.Day,
  //     dateBefore: new Date(),
  //   };
  //   par.dateAfter = this.service.getStartDate(this.service.getDefaultDuration(par.timeframe));

  //   return this.scoresApi.getScores(par).pipe(
  //     map((r) => r.data || ({} as ScoresResponseDtoApi)),
  //     filter((x) => !!x),
  //   );
  // }

  getCompletion(filt: ScoreFilters, isProgression: boolean): Observable<ProgramRunApi[]> {
    const par = {
      page: 1,
      itemPerPage: 300,
    } as GetProgramRunsRequestParams;

    if (filt.team) {
      par.teamIds = filt.team;
    }

    if (isProgression) {
      const [start, end] = this.getPreviousPeriod(filt.duration);

      par.createdAfter = start;
      par.createdBefore = end;
    } else {
      par.createdAfter = this.service.getStartDate(filt.duration as ScoreDuration);
      par.createdBefore = this.service.getYesterday();
    }

    return this.programsApi.getProgramRuns(par).pipe(map((r) => r.data || ({} as ProgramRunApi[])));
  }

  private getPreviousPeriod(duration: string | ScoreDuration | undefined): Date[] {
    let date = new Date();
    switch (duration) {
      case 'week':
        date = addDays(date, -14);
        break;
      case 'month':
        date = addDays(date, -60);
        break;
      case 'trimester':
        date = addDays(date, -180);
        break;
      case 'year':
        date = addDays(date, -730);
        break;
      default:
        date = addDays(date, -60);
        break;
    }
    return [date, this.service.getStartDate(duration as ScoreDuration)];
  }
}

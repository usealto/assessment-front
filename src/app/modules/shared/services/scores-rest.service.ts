import { Injectable } from '@angular/core';
import {
  GetProgramRunsRequestParams,
  GetProgramsStatsRequestParams,
  GetQuestionsStatsRequestParams,
  GetScoresRequestParams,
  GetTagsStatsRequestParams,
  GetTeamsStatsRequestParams,
  GetUsersStatsRequestParams,
  ProgramRunDtoApi,
  ProgramRunsApiService,
  ProgramStatsDtoPaginatedResponseApi,
  QuestionStatsDtoPaginatedResponseApi,
  ScoreByTypeEnumApi,
  ScoreFillValuesEnumApi,
  ScoreTimeframeEnumApi,
  ScoreTypeEnumApi,
  ScoresApiService,
  ScoresResponseDtoApi,
  StatsApiService,
  TagStatsDtoPaginatedResponseApi,
  UserStatsDtoPaginatedResponseApi,
} from '@usealto/sdk-ts-angular';
import { addDays } from 'date-fns';
import { Observable, filter, map } from 'rxjs';
import { EScoreDuration, Score } from '../../../models/score.model';
import { TeamStats } from '../../../models/team.model';
import { ChartFilters } from '../../shared/models/chart.model';
import { ScoresService } from './scores.service';

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

  getPaginatedUsersStats(
    duration: EScoreDuration,
    isProgression = false,
    reqParams: GetUsersStatsRequestParams = {},
  ): Observable<UserStatsDtoPaginatedResponseApi> {
    let dateAfter: Date;
    let dateBefore: Date;

    if (isProgression) {
      const [start, end] = this.service.getPreviousPeriod(duration);

      dateAfter = start;
      dateBefore = end;
    } else {
      dateAfter = this.service.getStartDate(duration);
      dateBefore = new Date();
      dateBefore = addDays(dateBefore, 1); //! TEMPORARY FIX to get data from actual day
    }

    return this.statsApi.getUsersStats({
      from: dateAfter,
      to: dateBefore,
      respondsRegularlyThreshold: 0.42,
      itemsPerPage: 1000,
      ...reqParams,
    } as GetUsersStatsRequestParams);
  }

  getPaginatedQuestionsStats(
    duration: EScoreDuration,
    isProgression = false,
    reqParams: GetQuestionsStatsRequestParams = {},
  ): Observable<QuestionStatsDtoPaginatedResponseApi> {
    let dateAfter: Date;
    let dateBefore: Date;

    if (isProgression) {
      const [start, end] = this.service.getPreviousPeriod(duration);

      dateAfter = start;
      dateBefore = end;
    } else {
      dateAfter = this.service.getStartDate(duration);
      dateBefore = new Date();
      dateBefore = addDays(dateBefore, 1); //! TEMPORARY FIX to get data from actual day
    }

    return this.statsApi.getQuestionsStats({
      page: 1,
      itemsPerPage: 400,
      from: dateAfter,
      to: dateBefore,
      respondsRegularlyThreshold: 0.42,
      teamIds: '',
      ...reqParams,
    } as GetQuestionsStatsRequestParams);
  }

  // Cloned from getTeamsStats() to use in resolver => Return TeamStats[] and not TeamStatsDtoApi[]
  getPaginatedTeamsStats(
    duration: EScoreDuration,
    isProgression = false,
    req: GetTeamsStatsRequestParams = {},
  ): Observable<TeamStats[]> {
    let dateAfter: Date;
    let dateBefore: Date;

    if (isProgression) {
      const [start, end] = this.service.getPreviousPeriod(duration);

      dateAfter = start;
      dateBefore = end;
    } else {
      dateAfter = this.service.getStartDate(duration);
      dateBefore = new Date();
      dateBefore = addDays(dateBefore, 1); //! TEMPORARY FIX to get data from actual day
    }

    return this.statsApi
      .getTeamsStats({
        page: 1,
        itemsPerPage: 400,
        from: dateAfter,
        to: dateBefore,
        ...req,
      } as GetTeamsStatsRequestParams)
      .pipe(
        map((response) =>
          response.data
            ? response.data.map((dto) =>
                TeamStats.fromDto(dto, dateAfter, dateBefore, duration, isProgression),
              )
            : [],
        ),
      );
  }

  getPaginatedProgramsStats(
    duration: EScoreDuration,
    isProgression = false,
    reqParams: GetProgramsStatsRequestParams = {},
  ): Observable<ProgramStatsDtoPaginatedResponseApi> {
    let dateAfter: Date;
    let dateBefore: Date;

    if (isProgression) {
      const [start, end] = this.service.getPreviousPeriod(duration);

      dateAfter = start;
      dateBefore = end;
    } else {
      dateAfter = this.service.getStartDate(duration);
      dateBefore = new Date();
      dateBefore = addDays(dateBefore, 1); //! TEMPORARY FIX to get data from actual day
    }

    return this.statsApi.getProgramsStats({
      itemsPerPage: 400,
      from: dateAfter,
      to: dateBefore,
      ...reqParams,
    });
  }

  getPaginatedTagsStats(
    duration: EScoreDuration,
    isProgression = false,
    reqParams?: GetTagsStatsRequestParams,
  ): Observable<TagStatsDtoPaginatedResponseApi> {
    let dateAfter: Date;
    let dateBefore: Date;

    if (isProgression) {
      const [start, end] = this.service.getPreviousPeriod(duration);

      dateAfter = start;
      dateBefore = end;
    } else {
      dateAfter = this.service.getStartDate(duration);
      dateBefore = new Date();
      dateBefore = addDays(dateBefore, 1); //! TEMPORARY FIX to get data from actual day
    }

    return this.statsApi.getTagsStats({
      itemsPerPage: 400,
      from: dateAfter,
      to: dateBefore,
      ...reqParams,
    } as GetTagsStatsRequestParams);
  }

  getScores(
    { duration, type, team, timeframe, sortBy, user, ids, scoredBy, scoredById }: ChartFilters,
    isProgression = false,
  ): Observable<Score[]> {
    const par: GetScoresRequestParams = {
      type: type ?? ScoreTypeEnumApi.Guess,
      timeframe: timeframe ?? ScoreTimeframeEnumApi.Day,
      dateAfter: this.service.getStartDate(duration as EScoreDuration),
      dateBefore: addDays(new Date(), 1), //! TEMPORARY FIX to get data from actual day
      fillValues: ScoreFillValuesEnumApi.Null,
      sortBy,
      scoredBy,
      scoredById,
    };

    if (isProgression) {
      const [start, end] = this.service.getPreviousPeriod(duration);

      par.dateAfter = start;
      par.dateBefore = end;
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
      map((r) => {
        if (timeframe === ScoreTimeframeEnumApi.Day) {
          r.scores.map((score) => {
            score.dates.pop();
            score.averages.pop();
            score.counts.pop();
            score.valids.pop();
          });
        }
        return r;
      }),
      map((r) => r.scores.map((s) => Score.fromDto(s))),
    );
  }
}

export * from './auth.service';
import { AuthApiService } from './auth.service';
export * from './challenges.service';
import { ChallengesApiService } from './challenges.service';
export * from './comments.service';
import { CommentsApiService } from './comments.service';
export * from './companies.service';
import { CompaniesApiService } from './companies.service';
export * from './guesses.service';
import { GuessesApiService } from './guesses.service';
export * from './programRuns.service';
import { ProgramRunsApiService } from './programRuns.service';
export * from './programs.service';
import { ProgramsApiService } from './programs.service';
export * from './questions.service';
import { QuestionsApiService } from './questions.service';
export * from './questionsSubmitted.service';
import { QuestionsSubmittedApiService } from './questionsSubmitted.service';
export * from './scores.service';
import { ScoresApiService } from './scores.service';
export * from './tags.service';
import { TagsApiService } from './tags.service';
export * from './teams.service';
import { TeamsApiService } from './teams.service';
export * from './uploads.service';
import { UploadsApiService } from './uploads.service';
export * from './users.service';
import { UsersApiService } from './users.service';
export const APIS = [AuthApiService, ChallengesApiService, CommentsApiService, CompaniesApiService, GuessesApiService, ProgramRunsApiService, ProgramsApiService, QuestionsApiService, QuestionsSubmittedApiService, ScoresApiService, TagsApiService, TeamsApiService, UploadsApiService, UsersApiService];

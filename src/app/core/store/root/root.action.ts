import { User } from 'src/app/models/user.model';
import { Action, createAction, props } from '@ngrx/store';
import { Team } from 'src/app/models/team.model';

// Timestamp
export const setTimestamp = createAction('[Timestamp] Set new timestamp', props<Date>());

// User
export const setUserMe = createAction('[User] Set me', props<{ user: User }>());
export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const setUsers = createAction('[User] Set Users', props<{ users: User[] }>());

// Team
export const setTeams = createAction('[User] Set Teams', props<{ teams: Team[] }>());

// Company
export const setCompany = createAction('[Company] Set Company', props<{ company: any }>());

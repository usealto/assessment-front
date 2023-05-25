import { Injectable } from '@angular/core';
import {
  CreateGuessDtoApi,
  CreateGuessRequestParams,
  GetGuessesRequestParams,
  GuessDtoApi,
  GuessesApiService,
} from '@usealto/sdk-ts-angular';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuessesRestService {
  constructor(private readonly guessesApi: GuessesApiService) {}

  getGuesses(): Observable<GuessDtoApi[]> {
    return this.guessesApi.getGuesses({} as GetGuessesRequestParams).pipe(map((d) => d.data ?? []));
  }

  postGuess(createGuessDtoApi: CreateGuessDtoApi): Observable<GuessDtoApi | undefined> {
    return this.guessesApi.createGuess({ createGuessDtoApi }).pipe(map((r) => r.data));
  }
}

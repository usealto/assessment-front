export interface IRanking {
  id: string;
  label: string;
  score: number;
  rank: number;
}

export class Ranking implements IRanking {
  id: string;
  label: string;
  score: number;
  rank: number;

  constructor(data: IRanking) {
    this.id = data.id;
    this.label = data.label;
    this.score = data.score;
    this.rank = data.rank;
  }

  get rawData(): IRanking {
    return {
      id: this.id,
      label: this.label,
      score: this.score,
      rank: this.rank,
    };
  }
}

export interface IBaseStats {
  from: Date;
  to: Date;
  score: number;
  totalGuessesCount: number;
  scoreById?: string;
}

export class BaseStats implements IBaseStats {
  from: Date;
  to: Date;
  score: number;
  totalGuessesCount: number;
  scoreById?: string;

  constructor(data: IBaseStats) {
    this.from = data.from;
    this.to = data.to;
    this.score = data.score;
    this.totalGuessesCount = data.totalGuessesCount;
    this.scoreById = data.scoreById;
  }

  get rawData(): IBaseStats {
    return {
      from: this.from,
      to: this.to,
      score: this.score,
      totalGuessesCount: this.totalGuessesCount,
      scoreById: this.scoreById,
    };
  }
}
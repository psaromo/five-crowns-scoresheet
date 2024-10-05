type Score = number | undefined;
export interface Scores {
  level3: Score;
  level4: Score;
  level5: Score;
  level6: Score;
  level7: Score;
  level8: Score;
  level9: Score;
  level10: Score;
  level11: Score;
  level12: Score;
  level13: Score;
}

export interface Player {
  id?: string;
  name: string;
  scores: Scores;
}

export interface PlayersRecord {
  [key: string]: Player;
}

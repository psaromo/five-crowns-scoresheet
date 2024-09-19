interface Scores {
  level3: number;
  level4: number;
  level5: number;
  level6: number;
  level7: number;
  level8: number;
  level9: number;
  level10: number;
  level11: number;
  level12: number;
  level13: number;
}

interface Player {
  name: string;
  scores: Scores;
}

interface PlayersRecord {
  [key: string]: Player;
}

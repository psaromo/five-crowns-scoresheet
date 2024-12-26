import { Player, PlayersRecord } from 'app/types/Players';

export const calculateScoresAndSort = (playersRecord: Player[]) => {
  // // Convert the players object to an array for easier manipulation
  const playerArray = playersRecord.map((player) => {
    // Calculate total score for each player (ignore null scores)
    const totalScore = Object.values(player.scores).reduce((sum, score) => {
      return !Number.isNaN(score) ? sum + score : sum;
    }, 0);

    return { name: player.name, totalScore };
  });

  // // Sort the players by their total score from low to high
  playerArray.sort((a, b) => a.totalScore - b.totalScore);

  return playerArray;
};

export const initialPlayers = (numPlayers = 2) => {
  const players: PlayersRecord = {};

  for (let i = 1; i <= numPlayers; i++) {
    players[`player${i}`] = {
      name: '',
      scores: {
        level3: undefined,
        level4: undefined,
        level5: undefined,
        level6: undefined,
        level7: undefined,
        level8: undefined,
        level9: undefined,
        level10: undefined,
        level11: undefined,
        level12: undefined,
        level13: undefined,
      },
    };
  }

  return players;
};

export const rank = [
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
  '8th',
  '9th',
  '10th',
  '11th',
  '12th',
  '13th',
  '14th',
  '15th',
  '16th',
  '17th',
  '18th',
  '19th',
  '20th',
  '21th',
];

import { Scores } from 'types/Players';

export const MIN_PLAYERS: number = 2;
export const MAX_PLAYERS: number = 21;

export const wildCards: { level: keyof Scores; display: string }[] = [
  { level: 'level3', display: '3' },
  { level: 'level4', display: '4' },
  { level: 'level5', display: '5' },
  { level: 'level6', display: '6' },
  { level: 'level7', display: '7' },
  { level: 'level8', display: '8' },
  { level: 'level9', display: '9' },
  { level: 'level10', display: '10' },
  { level: 'level11', display: 'J' },
  { level: 'level12', display: 'Q' },
  { level: 'level13', display: 'K' },
];

export const rank: string[] = [
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

export type JourneyStage =
  | 'intro'
  | 'arrest'
  | 'judgment'
  | 'yama'
  | 'descent'
  | 'punishment'
  | 'bridge'
  | 'rebirth'
  | 'heavenStairs'
  | 'heaven';

export type Intensity = 0 | 1 | 2;

export interface SinRecord {
  levelId: string;
  sinIndex: number;
}

export type JourneySource = 'random' | 'transfer';

export interface Journey {
  stage: JourneyStage;
  soulName: string;
  source: JourneySource;
  sins: SinRecord[];
  merit: number;
  hasAppealed: boolean;
  sentencedLevelId: string | null;
  cyclesRequired: number;
  cyclesCompleted: number;
  intensity: Intensity;
  sceneSeed: number;
  rebirthId: string | null;
}

export const initialJourney: Journey = {
  stage: 'intro',
  soulName: '',
  source: 'random',
  sins: [],
  merit: 0,
  hasAppealed: false,
  sentencedLevelId: null,
  cyclesRequired: 0,
  cyclesCompleted: 0,
  intensity: 0,
  sceneSeed: 1,
  rebirthId: null,
};

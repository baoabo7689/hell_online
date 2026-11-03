export interface RebirthForm {
  id: string;
  icon: string;
  baseWeight: number;
  karmaWeightPerCycle: number;
}

export const rebirthForms: RebirthForm[] = [
  { id: 'humanRich', icon: '🤴', baseWeight: 6, karmaWeightPerCycle: -1 },
  { id: 'humanOrdinary', icon: '🧑', baseWeight: 14, karmaWeightPerCycle: -1 },
  { id: 'humanPoor', icon: '🧑‍🌾', baseWeight: 10, karmaWeightPerCycle: 0 },
  { id: 'dog', icon: '🐕', baseWeight: 8, karmaWeightPerCycle: 1 },
  { id: 'cat', icon: '🐈', baseWeight: 8, karmaWeightPerCycle: 0 },
  { id: 'pig', icon: '🐖', baseWeight: 6, karmaWeightPerCycle: 2 },
  { id: 'buffalo', icon: '🐃', baseWeight: 5, karmaWeightPerCycle: 2 },
  { id: 'chicken', icon: '🐓', baseWeight: 5, karmaWeightPerCycle: 2 },
  { id: 'fish', icon: '🐟', baseWeight: 4, karmaWeightPerCycle: 2 },
  { id: 'ant', icon: '🐜', baseWeight: 2, karmaWeightPerCycle: 3 },
  { id: 'mosquito', icon: '🦟', baseWeight: 1, karmaWeightPerCycle: 3 },
  { id: 'snail', icon: '🐌', baseWeight: 2, karmaWeightPerCycle: 2 },
];

export function findRebirthForm(rebirthId: string | null): RebirthForm | undefined {
  return rebirthForms.find(form => form.id === rebirthId);
}

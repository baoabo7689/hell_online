import { findHellLevel, hellLevels } from '@/data/hellLevels';
import { rebirthForms } from '@/data/rebirths';
import { Intensity, initialJourney, Journey, SinRecord } from '@/models/Journey';
import { newSceneSeed, pickRandom, pickWeighted, randomInt } from './randomUtilities';
import { SoulTransferPayload } from './soulTransfer';

const INNOCENT_CHANCE = 0.12;
const MAX_INTENSITY: Intensity = 2;
const JOURNEY_STORAGE_KEY = 'hell_online_journey';
const MERIT_PER_CYCLE_FORGIVEN = 10;

function randomSin(excluding: SinRecord[]): SinRecord {
  for (let attempt = 0; attempt < 20; attempt++) {
    const level = pickRandom(hellLevels);
    const candidate = { levelId: level.id, sinIndex: randomInt(0, level.sinCount - 1) };
    const alreadyRecorded = excluding.some(
      sin => sin.levelId === candidate.levelId && sin.sinIndex === candidate.sinIndex
    );
    if (!alreadyRecorded) return candidate;
  }
  return { levelId: hellLevels[0].id, sinIndex: 0 };
}

function randomSins(): SinRecord[] {
  if (Math.random() < INNOCENT_CHANCE) return [];
  const sinCount = randomInt(1, 4);
  const sins: SinRecord[] = [];
  while (sins.length < sinCount) sins.push(randomSin(sins));
  return sins;
}

export function startJourney(soulName: string, transfer: SoulTransferPayload | null): Journey {
  return {
    ...initialJourney,
    stage: 'arrest',
    soulName: soulName.trim() || transfer?.soulName || '',
    source: transfer ? 'transfer' : 'random',
    sins: transfer ? transfer.sins : randomSins(),
    merit: transfer?.merit ?? 0,
    sceneSeed: newSceneSeed(),
  };
}

export function appealJudgment(journey: Journey): Journey {
  const revealedSin: SinRecord = { levelId: 'mirror', sinIndex: 0 };
  const alreadyRecorded = journey.sins.some(
    sin => sin.levelId === revealedSin.levelId && sin.sinIndex === revealedSin.sinIndex
  );
  return {
    ...journey,
    hasAppealed: true,
    sins: alreadyRecorded ? [...journey.sins, randomSin(journey.sins)] : [...journey.sins, revealedSin],
  };
}

export function deepestSinLevelId(sins: SinRecord[]): string | null {
  const orders = sins
    .map(sin => findHellLevel(sin.levelId))
    .filter(level => level !== undefined)
    .map(level => level!.order);
  if (orders.length === 0) return null;
  const deepestOrder = Math.max(...orders);
  return hellLevels.find(level => level.order === deepestOrder)!.id;
}

export function sentenceJourney(journey: Journey): Journey {
  return {
    ...journey,
    stage: 'yama',
    sentencedLevelId: deepestSinLevelId(journey.sins),
    cyclesRequired: Math.max(
      1,
      1 + journey.sins.length + randomInt(0, 2) - Math.floor(journey.merit / MERIT_PER_CYCLE_FORGIVEN)
    ),
    cyclesCompleted: 0,
    intensity: 0,
  };
}

export function endureCurrentIntensity(journey: Journey): Journey {
  if (journey.intensity < MAX_INTENSITY) {
    return { ...journey, intensity: (journey.intensity + 1) as Intensity };
  }
  return {
    ...journey,
    intensity: 0,
    cyclesCompleted: journey.cyclesCompleted + 1,
    sceneSeed: newSceneSeed(),
  };
}

export function isSentenceServed(journey: Journey): boolean {
  return journey.cyclesRequired > 0 && journey.cyclesCompleted >= journey.cyclesRequired;
}

export function rollRebirth(journey: Journey): Journey {
  const karma = journey.cyclesRequired;
  const rebirth = pickWeighted(
    rebirthForms,
    form => form.baseWeight + form.karmaWeightPerCycle * karma
  );
  return { ...journey, stage: 'rebirth', rebirthId: rebirth.id };
}

export function saveJourney(journey: Journey) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(journey));
}

export function loadJourney(): Journey | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(JOURNEY_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Journey;
    return parsed?.stage ? { ...initialJourney, ...parsed } : null;
  } catch {
    return null;
  }
}

export function clearJourney() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(JOURNEY_STORAGE_KEY);
}

export type ParticleKind = 'embers' | 'snow' | 'mist' | 'drops' | 'sparks';

export interface HellLevel {
  id: string;
  order: number;
  icon: string;
  props: string[];
  background: string;
  particle: ParticleKind;
  sinCount: number;
}

export const hellLevels: HellLevel[] = [
  { id: 'tongue', order: 1, icon: '👅', props: ['🪝', '⛓️', '🗣️'], background: 'from-red-950 via-stone-900 to-black', particle: 'embers', sinCount: 4 },
  { id: 'scissors', order: 2, icon: '✂️', props: ['💍', '💔', '🪡'], background: 'from-rose-950 via-zinc-900 to-black', particle: 'sparks', sinCount: 3 },
  { id: 'ironTree', order: 3, icon: '🌲', props: ['🗡️', '🔩', '🩸'], background: 'from-slate-800 via-zinc-900 to-black', particle: 'sparks', sinCount: 3 },
  { id: 'mirror', order: 4, icon: '🪞', props: ['👁️', '🕯️', '📜'], background: 'from-indigo-950 via-slate-900 to-black', particle: 'mist', sinCount: 3 },
  { id: 'steamer', order: 5, icon: '♨️', props: ['🥟', '💨', '🔥'], background: 'from-orange-950 via-stone-900 to-black', particle: 'mist', sinCount: 3 },
  { id: 'copperPillar', order: 6, icon: '🏛️', props: ['🔥', '🟧', '⛓️'], background: 'from-amber-900 via-red-950 to-black', particle: 'embers', sinCount: 3 },
  { id: 'knifeMountain', order: 7, icon: '⛰️', props: ['🔪', '🗡️', '🩸'], background: 'from-zinc-700 via-zinc-900 to-black', particle: 'sparks', sinCount: 3 },
  { id: 'iceMountain', order: 8, icon: '🏔️', props: ['🧊', '❄️', '🥶'], background: 'from-sky-900 via-slate-900 to-black', particle: 'snow', sinCount: 3 },
  { id: 'oilCauldron', order: 9, icon: '🫕', props: ['🛢️', '🔥', '🫧'], background: 'from-yellow-900 via-red-950 to-black', particle: 'embers', sinCount: 4 },
  { id: 'oxPit', order: 10, icon: '🐃', props: ['🐂', '💢', '🕳️'], background: 'from-amber-950 via-stone-900 to-black', particle: 'mist', sinCount: 3 },
  { id: 'stoneCrush', order: 11, icon: '🪨', props: ['🪨', '⛏️', '💦'], background: 'from-stone-700 via-stone-900 to-black', particle: 'drops', sinCount: 3 },
  { id: 'pestle', order: 12, icon: '🥣', props: ['🍚', '🔨', '🌾'], background: 'from-yellow-950 via-stone-900 to-black', particle: 'sparks', sinCount: 3 },
  { id: 'bloodPool', order: 13, icon: '🩸', props: ['🌊', '🦴', '🥀'], background: 'from-red-900 via-red-950 to-black', particle: 'drops', sinCount: 3 },
  { id: 'wrongfulDeath', order: 14, icon: '⚰️', props: ['🏍️', '🍶', '💀'], background: 'from-neutral-800 via-neutral-900 to-black', particle: 'mist', sinCount: 3 },
  { id: 'dismember', order: 15, icon: '🪓', props: ['🪦', '⚱️', '⛓️'], background: 'from-purple-950 via-zinc-900 to-black', particle: 'mist', sinCount: 3 },
  { id: 'fireMountain', order: 16, icon: '🌋', props: ['🔥', '💰', '🧾'], background: 'from-orange-700 via-red-900 to-black', particle: 'embers', sinCount: 3 },
  { id: 'millstone', order: 17, icon: '⚙️', props: ['🪨', '📿', '🏯'], background: 'from-stone-800 via-gray-900 to-black', particle: 'sparks', sinCount: 3 },
  { id: 'saw', order: 18, icon: '🪚', props: ['⚖️', '🪵', '💸'], background: 'from-red-950 via-neutral-900 to-black', particle: 'sparks', sinCount: 3 },
];

export function findHellLevel(levelId: string | null): HellLevel | undefined {
  return hellLevels.find(level => level.id === levelId);
}

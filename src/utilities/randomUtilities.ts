export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let mixed = state;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomInt(minInclusive: number, maxInclusive: number, random = Math.random): number {
  return minInclusive + Math.floor(random() * (maxInclusive - minInclusive + 1));
}

export function pickRandom<T>(items: T[], random = Math.random): T {
  return items[Math.floor(random() * items.length)];
}

export function pickWeighted<T>(items: T[], weightOf: (item: T) => number, random = Math.random): T {
  const weights = items.map(item => Math.max(0, weightOf(item)));
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let remaining = random() * totalWeight;
  for (let index = 0; index < items.length; index++) {
    remaining -= weights[index];
    if (remaining < 0) return items[index];
  }
  return items[items.length - 1];
}

export function newSceneSeed(): number {
  return Math.floor(Math.random() * 2147483647) + 1;
}

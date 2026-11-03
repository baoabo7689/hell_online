export const aiImageCountByLevel: Record<string, number> = {};

export function aiImageUrl(levelId: string, sceneSeed: number): string | null {
  const imageCount = aiImageCountByLevel[levelId] ?? 0;
  if (imageCount === 0) return null;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}/images/levels/${levelId}/${(sceneSeed % imageCount) + 1}.webp`;
}

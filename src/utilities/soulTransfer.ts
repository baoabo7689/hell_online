import { hellLevels } from '@/data/hellLevels';
import { SinRecord } from '@/models/Journey';

export const SOUL_TRANSFER_VERSION = 1;
export const SOUL_TRANSFER_QUERY_KEY = 'soul';

export interface SoulTransferPayload {
  version: number;
  soulName: string;
  sins: SinRecord[];
  merit: number;
}

function decodeBase64Url(encoded: string): string {
  const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeSoulTransfer(payload: SoulTransferPayload): string {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function isKnownSin(record: unknown): record is SinRecord {
  if (typeof record !== 'object' || record === null) return false;
  const candidate = record as SinRecord;
  const level = hellLevels.find(hellLevel => hellLevel.id === candidate.levelId);
  return (
    level !== undefined &&
    Number.isInteger(candidate.sinIndex) &&
    candidate.sinIndex >= 0 &&
    candidate.sinIndex < level.sinCount
  );
}

export function parseSoulTransfer(encoded: string | null): SoulTransferPayload | null {
  if (!encoded) return null;
  try {
    const parsed = JSON.parse(decodeBase64Url(encoded));
    if (parsed?.version !== SOUL_TRANSFER_VERSION || !Array.isArray(parsed.sins)) return null;
    return {
      version: SOUL_TRANSFER_VERSION,
      soulName: typeof parsed.soulName === 'string' ? parsed.soulName.slice(0, 40) : '',
      sins: parsed.sins.filter(isKnownSin).slice(0, 12),
      merit: Number.isFinite(parsed.merit) ? Math.max(0, Math.floor(parsed.merit)) : 0,
    };
  } catch {
    return null;
  }
}

export function readSoulTransferFromLocation(): SoulTransferPayload | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return parseSoulTransfer(params.get(SOUL_TRANSFER_QUERY_KEY));
}

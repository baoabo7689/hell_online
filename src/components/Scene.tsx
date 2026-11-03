'use client';

import { useMemo } from 'react';
import { ParticleKind } from '@/data/hellLevels';
import { createSeededRandom } from '@/utilities/randomUtilities';

const particleGlyphs: Record<ParticleKind, string[]> = {
  embers: ['•', '✦', '·'],
  sparks: ['✧', '·', '⋆'],
  snow: ['❄', '✻', '·'],
  drops: ['💧', '•', '·'],
  mist: ['☁', '〰', '～'],
};

const particleColors: Record<ParticleKind, string> = {
  embers: 'text-orange-400',
  sparks: 'text-yellow-200',
  snow: 'text-sky-100',
  drops: 'text-red-500',
  mist: 'text-stone-300',
};

interface SceneProps {
  background: string;
  particle: ParticleKind;
  seed: number;
  particleCount?: number;
  shakeClass?: string;
  imageUrl?: string | null;
  children: React.ReactNode;
}

export default function Scene({
  background,
  particle,
  seed,
  particleCount = 28,
  shakeClass = '',
  imageUrl = null,
  children,
}: SceneProps) {
  const particles = useMemo(() => {
    const random = createSeededRandom(seed);
    return Array.from({ length: particleCount }, (_, index) => ({
      key: index,
      left: random() * 100,
      top: particle === 'mist' ? random() * 90 : particle === 'snow' || particle === 'drops' ? -5 : 100,
      size: 8 + random() * 18,
      duration: (particle === 'mist' ? 10 : 4) + random() * 6,
      delay: -random() * 10,
      glyph: particleGlyphs[particle][Math.floor(random() * particleGlyphs[particle].length)],
    }));
  }, [seed, particle, particleCount]);

  return (
    <div className={`relative flex-1 overflow-hidden bg-gradient-to-b ${background}`}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          onError={event => (event.currentTarget.style.display = 'none')}
        />
      )}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {particles.map(item => (
          <span
            key={item.key}
            className={`absolute particle-${particle} ${particleColors[particle]}`}
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              fontSize: item.size,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.glyph}
          </span>
        ))}
      </div>
      <div className={`relative z-10 flex h-full flex-col items-center justify-center gap-6 px-4 py-10 ${shakeClass}`}>
        {children}
      </div>
    </div>
  );
}

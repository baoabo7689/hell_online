'use client';

import { useState } from 'react';
import Character from '@/components/Character';
import Scene from '@/components/Scene';
import { useLanguage } from '@/context/LanguageContext';
import { fillTemplate } from '@/utilities/textUtilities';
import { StageProps } from './StageProps';

export default function ArrestStage({ journey, updateJourney }: StageProps) {
  const { translations } = useLanguage();
  const [hasTriedToFlee, setHasTriedToFlee] = useState(false);
  const soulName = journey.soulName || translations.common.soulDefault;

  return (
    <Scene background="from-stone-950 via-zinc-900 to-black" particle="mist" seed={journey.sceneSeed}>
      <h2 className="text-3xl font-bold text-orange-300">{translations.arrest.title}</h2>
      <div className="flex w-full max-w-4xl flex-wrap items-end justify-center gap-8">
        <div className="animate-walk-in-left">
          <Character
            icon="🐂"
            name={translations.arrest.oxHeadName}
            line={fillTemplate(translations.arrest.oxHeadLine, { name: soulName })}
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className={`text-6xl select-none ${hasTriedToFlee ? 'shake-1' : 'animate-float'}`} aria-hidden>
            👻
          </div>
          <div className="text-2xl" aria-hidden>
            ⛓️
          </div>
          <div className="text-sm text-stone-300">{soulName}</div>
        </div>
        <div className="animate-walk-in-right">
          <Character
            icon="🐴"
            name={translations.arrest.horseFaceName}
            line={hasTriedToFlee ? translations.arrest.fleeFail : translations.arrest.horseFaceLine}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          className="btn-underworld"
          onClick={() => updateJourney({ ...journey, stage: 'judgment' })}
        >
          {translations.arrest.follow}
        </button>
        {!hasTriedToFlee && (
          <button type="button" className="btn-ghost" onClick={() => setHasTriedToFlee(true)}>
            {translations.arrest.flee}
          </button>
        )}
      </div>
    </Scene>
  );
}

'use client';

import { useState } from 'react';
import Character from '@/components/Character';
import Scene from '@/components/Scene';
import { useLanguage } from '@/context/LanguageContext';
import { findHellLevel } from '@/data/hellLevels';
import { rollRebirth } from '@/utilities/journeyUtilities';
import { fillTemplate } from '@/utilities/textUtilities';
import { StageProps } from './StageProps';

const STEP_PERCENT = 10;

export default function BridgeStage({ journey, updateJourney }: StageProps) {
  const { translations } = useLanguage();
  const [hasDrunkSoup, setHasDrunkSoup] = useState(false);
  const [crossedPercent, setCrossedPercent] = useState(0);
  const hasCrossed = crossedPercent >= 100;

  return (
    <Scene background="from-indigo-950 via-slate-900 to-black" particle="mist" seed={journey.sceneSeed} particleCount={40}>
      <h2 className="text-3xl font-bold text-sky-200">{translations.bridge.title}</h2>

      <div className="flex w-full max-w-3xl flex-wrap items-start justify-center gap-10">
        <Character
          icon="👵"
          name={translations.bridge.mengPoName}
          line={hasDrunkSoup ? translations.bridge.drunk : translations.bridge.mengPoLine}
        />
        <div className={`speech-bubble w-full max-w-sm ${hasDrunkSoup ? 'animate-memory-fade' : ''}`}>
          <div className="mb-2 text-sm font-semibold text-sky-200">{translations.bridge.memoriesTitle}</div>
          <ul className="space-y-1 text-sm text-stone-300">
            <li>👤 {journey.soulName || translations.common.soulDefault}</li>
            {journey.sins.map((sin, index) => (
              <li key={`${sin.levelId}-${index}`}>
                {findHellLevel(sin.levelId)?.icon} {translations.levels[sin.levelId]?.sins[sin.sinIndex]}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!hasDrunkSoup ? (
        <button type="button" className="btn-underworld" onClick={() => setHasDrunkSoup(true)}>
          🍵 {translations.bridge.drink}
        </button>
      ) : (
        <div className="flex w-full max-w-2xl flex-col items-center gap-4">
          <div className="relative h-24 w-full">
            <div className="absolute bottom-6 left-0 right-0 h-3 rounded bg-gradient-to-r from-stone-500 via-stone-400 to-amber-200" />
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-indigo-800/60 via-sky-900/60 to-indigo-800/60" />
            <div
              className="absolute bottom-8 text-5xl transition-all duration-500"
              style={{ left: `calc(${crossedPercent}% - ${crossedPercent * 0.4}px)` }}
              aria-hidden
            >
              👻
            </div>
            <div className="absolute bottom-8 right-0 text-4xl animate-flicker" aria-hidden>
              ☸️
            </div>
          </div>
          <div className="text-sm text-stone-300">
            {hasCrossed ? translations.bridge.reachedEnd : fillTemplate(translations.bridge.walking, { percent: crossedPercent })}
          </div>
          {hasCrossed ? (
            <button type="button" className="btn-heaven" onClick={() => updateJourney(rollRebirth(journey))}>
              {translations.bridge.toRebirth}
            </button>
          ) : (
            <button
              type="button"
              className="btn-underworld"
              onClick={() => setCrossedPercent(percent => Math.min(100, percent + STEP_PERCENT))}
            >
              👣 {translations.bridge.walk}
            </button>
          )}
        </div>
      )}
    </Scene>
  );
}

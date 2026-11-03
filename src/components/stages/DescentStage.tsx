'use client';

import { useEffect, useState } from 'react';
import Scene from '@/components/Scene';
import { useLanguage } from '@/context/LanguageContext';
import { findHellLevel, hellLevels } from '@/data/hellLevels';
import { fillTemplate } from '@/utilities/textUtilities';
import { StageProps } from './StageProps';

const STEP_INTERVAL_MS = 350;

export default function DescentStage({ journey, updateJourney }: StageProps) {
  const { translations } = useLanguage();
  const targetOrder = findHellLevel(journey.sentencedLevelId)?.order ?? 1;
  const [currentOrder, setCurrentOrder] = useState(1);
  const currentLevel = hellLevels[currentOrder - 1];
  const hasArrived = currentOrder >= targetOrder;

  useEffect(() => {
    if (hasArrived) return;
    const timeout = setTimeout(() => setCurrentOrder(order => order + 1), STEP_INTERVAL_MS);
    return () => clearTimeout(timeout);
  }, [currentOrder, hasArrived]);

  return (
    <Scene background={currentLevel.background} particle={currentLevel.particle} seed={currentOrder}>
      <h2 className="text-3xl font-bold text-orange-300">{translations.descent.title}</h2>
      <div className="flex items-center gap-6">
        <span className="text-5xl" aria-hidden>
          🐂
        </span>
        <span className="text-6xl animate-float" aria-hidden>
          👻
        </span>
        <span className="text-5xl" aria-hidden>
          🐴
        </span>
      </div>
      <div key={currentOrder} className="animate-fade-in-up text-center">
        <div className="text-7xl" aria-hidden>
          {currentLevel.icon}
        </div>
        <div className="mt-2 text-lg text-stone-200">
          {fillTemplate(translations.descent.passing, { order: currentOrder })}
        </div>
        <div className="text-sm text-stone-400">{translations.levels[currentLevel.id].name}</div>
      </div>
      <div className="flex gap-1" aria-hidden>
        {hellLevels.map(level => (
          <span
            key={level.id}
            className={`h-2 w-3 rounded-sm ${level.order <= currentOrder ? 'bg-orange-500' : 'bg-stone-700'}`}
          />
        ))}
      </div>
      {hasArrived && (
        <button
          type="button"
          className="btn-underworld animate-fade-in-up"
          onClick={() => updateJourney({ ...journey, stage: 'punishment' })}
        >
          {translations.descent.arrived}
        </button>
      )}
    </Scene>
  );
}

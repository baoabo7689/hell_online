'use client';

import { useMemo } from 'react';
import Scene from '@/components/Scene';
import { useLanguage } from '@/context/LanguageContext';
import { createSeededRandom } from '@/utilities/randomUtilities';
import { fillTemplate } from '@/utilities/textUtilities';
import { StageProps } from './StageProps';

const ACTIVITY_COUNT = 3;

export default function HeavenStage({ journey, restart }: StageProps) {
  const { translations } = useLanguage();
  const allActivities: string[] = translations.heaven.activities;

  const todaysActivities = useMemo(() => {
    const random = createSeededRandom(journey.sceneSeed);
    return [...allActivities].sort(() => random() - 0.5).slice(0, ACTIVITY_COUNT);
  }, [allActivities, journey.sceneSeed]);

  return (
    <Scene background="from-amber-100 via-sky-200 to-sky-400" particle="sparks" seed={journey.sceneSeed} particleCount={40}>
      <h2 className="text-4xl font-bold text-amber-700 drop-shadow">{translations.heaven.title}</h2>
      <div className="flex items-end gap-6 text-6xl" aria-hidden>
        <span className="animate-float">☁️</span>
        <span className="text-9xl animate-float">😇</span>
        <span className="animate-float">☁️</span>
      </div>
      <p className="text-2xl font-semibold text-sky-900">
        {fillTemplate(translations.heaven.becameAngel, { name: journey.soulName || translations.common.soulDefault })}
      </p>
      <div className="speech-bubble speech-bubble-light w-full max-w-md">
        <div className="mb-2 font-semibold">{translations.heaven.activitiesTitle}</div>
        <ul className="space-y-1 text-sm">
          {todaysActivities.map(activity => (
            <li key={activity}>🪽 {activity}</li>
          ))}
        </ul>
      </div>
      <button type="button" className="btn-heaven" onClick={restart}>
        {translations.common.restart}
      </button>
    </Scene>
  );
}

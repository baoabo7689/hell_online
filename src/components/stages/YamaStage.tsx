'use client';

import Character from '@/components/Character';
import Scene from '@/components/Scene';
import { useLanguage } from '@/context/LanguageContext';
import { findHellLevel } from '@/data/hellLevels';
import { fillTemplate } from '@/utilities/textUtilities';
import { StageProps } from './StageProps';

export default function YamaStage({ journey, updateJourney }: StageProps) {
  const { translations } = useLanguage();
  const level = findHellLevel(journey.sentencedLevelId);
  const levelText = level ? translations.levels[level.id] : undefined;

  return (
    <Scene background="from-red-900 via-red-950 to-black" particle="embers" seed={journey.sceneSeed}>
      <h2 className="text-3xl font-bold text-orange-300">{translations.yama.title}</h2>
      <div className="flex items-end gap-6">
        <div className="text-5xl animate-float" aria-hidden>
          🐂
        </div>
        <Character
          icon="👺"
          name={translations.yama.kingName}
          sizeClass="text-9xl"
          animationClass="animate-flicker"
        />
        <div className="text-5xl animate-float" aria-hidden>
          🐴
        </div>
      </div>
      <div className="speech-bubble max-w-lg text-center animate-fade-in-up">
        <p className="text-sm text-stone-400">{translations.yama.verdictIntro}</p>
        <p className="my-2 text-2xl font-bold text-red-400">
          {level?.icon}{' '}
          {fillTemplate(translations.yama.verdict, { order: level?.order ?? '', level: levelText?.name ?? '' })}
        </p>
        <p className="text-sm text-stone-300">{levelText?.description}</p>
        <p className="mt-2 text-xs italic text-stone-400">{translations.yama.cycles}</p>
      </div>
      <button type="button" className="btn-underworld" onClick={() => updateJourney({ ...journey, stage: 'descent' })}>
        ⚖️ {translations.yama.accept}
      </button>
    </Scene>
  );
}

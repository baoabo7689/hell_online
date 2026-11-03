'use client';

import { useEffect, useState } from 'react';
import Character from '@/components/Character';
import Scene from '@/components/Scene';
import { useLanguage } from '@/context/LanguageContext';
import { findHellLevel } from '@/data/hellLevels';
import { appealJudgment, sentenceJourney } from '@/utilities/journeyUtilities';
import { StageProps } from './StageProps';

const REVEAL_INTERVAL_MS = 900;

export default function JudgmentStage({ journey, updateJourney }: StageProps) {
  const { translations } = useLanguage();
  const [revealedSinCount, setRevealedSinCount] = useState(0);
  const [hasFinishedReading, setHasFinishedReading] = useState(false);
  const isInnocent = journey.sins.length === 0;

  useEffect(() => {
    if (revealedSinCount >= journey.sins.length) {
      const timeout = setTimeout(() => setHasFinishedReading(true), REVEAL_INTERVAL_MS);
      return () => clearTimeout(timeout);
    }
    setHasFinishedReading(false);
    const timeout = setTimeout(() => setRevealedSinCount(count => count + 1), REVEAL_INTERVAL_MS);
    return () => clearTimeout(timeout);
  }, [revealedSinCount, journey.sins.length]);

  const judgeLine = !hasFinishedReading
    ? translations.judgment.reading
    : isInnocent
      ? translations.judgment.innocentLine
      : journey.hasAppealed
        ? translations.judgment.appealLine
        : translations.judgment.guiltyLine;

  return (
    <Scene background="from-slate-950 via-red-950 to-black" particle="embers" seed={journey.sceneSeed}>
      <h2 className="text-3xl font-bold text-orange-300">{translations.judgment.title}</h2>
      <div className="flex w-full max-w-4xl flex-wrap items-start justify-center gap-10">
        <Character icon="🧙‍♂️" name={translations.judgment.judgeName} line={judgeLine} />
        <div className="w-full max-w-md rounded-lg border border-amber-800 bg-amber-50/95 p-4 text-stone-900 shadow-2xl">
          <div className="mb-3 flex items-center gap-2 border-b border-amber-800/40 pb-2 font-semibold">
            <span aria-hidden>📜</span>
            {translations.judgment.sinsTitle}
          </div>
          {isInnocent && hasFinishedReading && <div className="py-6 text-center text-4xl">✨</div>}
          <ul className="space-y-2">
            {journey.sins.slice(0, revealedSinCount).map((sin, index) => {
              const level = findHellLevel(sin.levelId);
              const levelText = translations.levels[sin.levelId];
              return (
                <li key={`${sin.levelId}-${sin.sinIndex}-${index}`} className="animate-fade-in-up flex gap-3">
                  <span className="text-2xl" aria-hidden>
                    {level?.icon}
                  </span>
                  <div>
                    <div className="font-medium">{levelText?.sins[sin.sinIndex]}</div>
                    <div className="text-xs text-red-800">
                      {translations.common.level} {level?.order} · {levelText?.name}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {hasFinishedReading && (
        <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up">
          {isInnocent ? (
            <button
              type="button"
              className="btn-heaven"
              onClick={() => updateJourney({ ...journey, stage: 'heavenStairs' })}
            >
              {translations.judgment.toHeaven}
            </button>
          ) : (
            <>
              <button type="button" className="btn-underworld" onClick={() => updateJourney(sentenceJourney(journey))}>
                {translations.judgment.toYama}
              </button>
              {!journey.hasAppealed && (
                <button type="button" className="btn-ghost" onClick={() => updateJourney(appealJudgment(journey))}>
                  {translations.judgment.appeal}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </Scene>
  );
}

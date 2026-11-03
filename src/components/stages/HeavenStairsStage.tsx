'use client';

import { useEffect, useState } from 'react';
import Character from '@/components/Character';
import Scene from '@/components/Scene';
import { useLanguage } from '@/context/LanguageContext';
import { fillTemplate } from '@/utilities/textUtilities';
import { StageProps } from './StageProps';

const TOTAL_STEPS = 9;
const GHOST_ATTEMPT_INTERVAL_MS = 3200;
const GHOST_SNEAK_DURATION_MS = 2400;

export default function HeavenStairsStage({ journey, updateJourney }: StageProps) {
  const { translations } = useLanguage();
  const [climbedSteps, setClimbedSteps] = useState(0);
  const [ghostsDestroyed, setGhostsDestroyed] = useState(0);
  const [ghostAttemptId, setGhostAttemptId] = useState(0);
  const [isZapping, setIsZapping] = useState(false);
  const stepsLeft = TOTAL_STEPS - climbedSteps;

  useEffect(() => {
    const interval = setInterval(() => setGhostAttemptId(attempt => attempt + 1), GHOST_ATTEMPT_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (ghostAttemptId === 0) return;
    const zapTimeout = setTimeout(() => {
      setIsZapping(true);
      setGhostsDestroyed(count => count + 1);
    }, GHOST_SNEAK_DURATION_MS * 0.75);
    const clearTimeoutId = setTimeout(() => setIsZapping(false), GHOST_SNEAK_DURATION_MS);
    return () => {
      clearTimeout(zapTimeout);
      clearTimeout(clearTimeoutId);
    };
  }, [ghostAttemptId]);

  return (
    <Scene background="from-sky-300 via-sky-600 to-indigo-900" particle="sparks" seed={journey.sceneSeed} particleCount={36}>
      <h2 className="text-3xl font-bold text-white drop-shadow">{translations.heavenStairs.title}</h2>
      <div className="flex w-full max-w-4xl flex-wrap items-end justify-center gap-10">
        <div className="relative flex flex-col-reverse items-center">
          {Array.from({ length: TOTAL_STEPS }, (_, stepIndex) => (
            <div
              key={stepIndex}
              className={`relative h-6 border border-white/60 ${stepIndex < climbedSteps ? 'bg-amber-200' : 'bg-white/70'}`}
              style={{ width: 220 - stepIndex * 18 }}
            >
              {stepIndex === climbedSteps - 1 && (
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-3xl" aria-hidden>
                  👻
                </span>
              )}
            </div>
          ))}
          {climbedSteps === 0 && (
            <span className="text-3xl" aria-hidden>
              👻
            </span>
          )}
        </div>
        <div className="relative">
          <Character
            icon="👼"
            name={translations.heavenStairs.angelName}
            line={translations.heavenStairs.angelLine}
            lightBubble
          />
          <div className="absolute -left-40 top-6 w-40" aria-hidden>
            {ghostAttemptId > 0 && (
              <span key={ghostAttemptId} className="absolute text-4xl animate-sneak">
                👻
              </span>
            )}
            {isZapping && (
              <span className="absolute left-28 text-5xl animate-zap">⚡</span>
            )}
          </div>
        </div>
      </div>
      <div className="speech-bubble speech-bubble-light text-center text-sm">
        <div>{fillTemplate(translations.heavenStairs.ghostsDestroyed, { count: ghostsDestroyed })}</div>
        {isZapping && <div className="font-semibold">{translations.heavenStairs.ghostAttempt}</div>}
      </div>
      {stepsLeft > 0 ? (
        <div className="flex flex-col items-center gap-2">
          <button type="button" className="btn-heaven" onClick={() => setClimbedSteps(steps => steps + 1)}>
            ⬆️ {translations.heavenStairs.climb}
          </button>
          <span className="text-sm text-white">{fillTemplate(translations.heavenStairs.stepsLeft, { count: stepsLeft })}</span>
        </div>
      ) : (
        <button type="button" className="btn-heaven animate-fade-in-up" onClick={() => updateJourney({ ...journey, stage: 'heaven' })}>
          ✨ {translations.heavenStairs.enter}
        </button>
      )}
    </Scene>
  );
}

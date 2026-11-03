'use client';

import { useCallback, useMemo, useState } from 'react';
import Character from '@/components/Character';
import HoldButton from '@/components/HoldButton';
import Scene from '@/components/Scene';
import { useLanguage } from '@/context/LanguageContext';
import { aiImageUrl } from '@/data/aiImages';
import { findHellLevel, hellLevels } from '@/data/hellLevels';
import { endureCurrentIntensity, isSentenceServed } from '@/utilities/journeyUtilities';
import { createSeededRandom } from '@/utilities/randomUtilities';
import { fillTemplate } from '@/utilities/textUtilities';
import { StageProps } from './StageProps';

const HOLD_DURATION_BY_INTENSITY_MS = [2000, 3000, 4000];
const INTENSITY_COLORS = ['bg-yellow-500', 'bg-orange-500', 'bg-red-600'];

export default function PunishmentStage({ journey, updateJourney }: StageProps) {
  const { translations } = useLanguage();
  const [isEnduring, setIsEnduring] = useState(false);
  const level = findHellLevel(journey.sentencedLevelId) ?? hellLevels[0];
  const levelText = translations.levels[level.id];
  const isServed = isSentenceServed(journey);
  const currentSin = journey.sins[journey.cyclesCompleted % Math.max(1, journey.sins.length)];
  const currentSinText = currentSin ? translations.levels[currentSin.levelId]?.sins[currentSin.sinIndex] : '';
  const variantLines: string[] = translations.punishment.variantLines;
  const atonementPercent = Math.min(100, (journey.cyclesCompleted / Math.max(1, journey.cyclesRequired)) * 100);

  const sceneLayout = useMemo(() => {
    const random = createSeededRandom(journey.sceneSeed);
    return {
      hueShift: Math.floor(random() * 50) - 25,
      props: Array.from({ length: 6 }, (_, index) => ({
        key: index,
        glyph: level.props[Math.floor(random() * level.props.length)],
        left: 5 + random() * 90,
        top: 10 + random() * 70,
        size: 28 + random() * 36,
        rotation: Math.floor(random() * 60) - 30,
      })),
    };
  }, [journey.sceneSeed, level]);

  const handleEndured = useCallback(() => updateJourney(endureCurrentIntensity(journey)), [journey, updateJourney]);

  return (
    <Scene
      background={level.background}
      particle={level.particle}
      seed={journey.sceneSeed}
      particleCount={20 + journey.intensity * 15}
      shakeClass={isEnduring && !isServed ? `shake-${journey.intensity}` : ''}
      imageUrl={aiImageUrl(level.id, journey.sceneSeed)}
    >
      <div className="pointer-events-none absolute inset-0" style={{ filter: `hue-rotate(${sceneLayout.hueShift}deg)` }} aria-hidden>
        {sceneLayout.props.map(prop => (
          <span
            key={prop.key}
            className="absolute opacity-40"
            style={{ left: `${prop.left}%`, top: `${prop.top}%`, fontSize: prop.size, transform: `rotate(${prop.rotation}deg)` }}
          >
            {prop.glyph}
          </span>
        ))}
      </div>

      <div className="text-center">
        <div className="text-sm uppercase tracking-widest text-stone-400">
          {translations.common.level} {level.order}
        </div>
        <h2 className="text-3xl font-bold text-orange-300">
          {level.icon} {levelText.name}
        </h2>
        <div className="mt-1 text-sm text-stone-300">
          {fillTemplate(translations.punishment.cycleLabel, { count: journey.cyclesCompleted + 1 })}
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="mb-1 flex justify-between text-xs text-stone-400">
          <span>{translations.punishment.atonement}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded bg-stone-800">
          <div className="h-full bg-amber-400 transition-all duration-700" style={{ width: `${atonementPercent}%` }} />
        </div>
      </div>

      {isServed ? (
        <div className="flex flex-col items-center gap-4 animate-fade-in-up">
          <Character icon="🐂" name={translations.arrest.oxHeadName} line={translations.punishment.servedLine} />
          <h3 className="text-2xl font-bold text-amber-300">{translations.punishment.servedTitle}</h3>
          <button type="button" className="btn-underworld" onClick={() => updateJourney({ ...journey, stage: 'bridge' })}>
            🌉 {translations.punishment.toBridge}
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            {(translations.punishment.intensities as string[]).map((label, index) => (
              <span
                key={label}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  index === journey.intensity
                    ? `${INTENSITY_COLORS[index]} text-white`
                    : index < journey.intensity
                      ? 'bg-stone-600 text-stone-300 line-through'
                      : 'bg-stone-800 text-stone-500'
                }`}
              >
                {label}
              </span>
            ))}
          </div>

          <div className={`text-8xl select-none ${isEnduring ? '' : 'animate-float'}`} aria-hidden>
            {journey.intensity === 2 ? '😱' : journey.intensity === 1 ? '😖' : '😣'}
          </div>

          <div key={`${journey.cyclesCompleted}-${journey.intensity}`} className="speech-bubble max-w-lg text-center animate-fade-in-up">
            <p className="text-xs italic text-amber-200">{translations.punishment.roleplay}</p>
            <p className="my-2 text-lg">{levelText.punishments[journey.intensity]}</p>
            {currentSinText && (
              <p className="text-xs text-red-300">{fillTemplate(translations.punishment.sinReminder, { sin: currentSinText })}</p>
            )}
            {journey.cyclesCompleted > 0 && journey.intensity === 0 && (
              <p className="mt-2 text-xs text-stone-400">{variantLines[journey.sceneSeed % variantLines.length]}</p>
            )}
          </div>

          <HoldButton
            durationMs={HOLD_DURATION_BY_INTENSITY_MS[journey.intensity]}
            idleLabel={translations.punishment.hold}
            holdingLabel={translations.punishment.holding}
            releasedLabel={translations.punishment.releasedTooEarly}
            resetKey={`${journey.cyclesCompleted}-${journey.intensity}`}
            onComplete={handleEndured}
            onHoldingChange={setIsEnduring}
          />
        </>
      )}
    </Scene>
  );
}

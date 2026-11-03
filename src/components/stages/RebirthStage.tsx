'use client';

import { useEffect, useState } from 'react';
import Scene from '@/components/Scene';
import { useLanguage } from '@/context/LanguageContext';
import { findRebirthForm, rebirthForms } from '@/data/rebirths';
import { fillTemplate } from '@/utilities/textUtilities';
import { StageProps } from './StageProps';

const SPIN_DURATION_MS = 2800;

export default function RebirthStage({ journey, restart }: StageProps) {
  const { translations } = useLanguage();
  const [isSpinning, setIsSpinning] = useState(true);
  const [hasCopied, setHasCopied] = useState(false);
  const rebirth = findRebirthForm(journey.rebirthId) ?? rebirthForms[1];
  const rebirthText = translations.rebirths[rebirth.id];

  useEffect(() => {
    const timeout = setTimeout(() => setIsSpinning(false), SPIN_DURATION_MS);
    return () => clearTimeout(timeout);
  }, []);

  const copyResult = async () => {
    const shareText = fillTemplate(translations.rebirth.shareText, {
      cycles: journey.cyclesCompleted,
      form: rebirthText.name,
      icon: rebirth.icon,
    });
    await navigator.clipboard?.writeText(`${shareText} ${window.location.origin}${window.location.pathname}`);
    setHasCopied(true);
  };

  return (
    <Scene background="from-amber-900 via-emerald-950 to-black" particle="sparks" seed={journey.sceneSeed} particleCount={40}>
      <h2 className="text-3xl font-bold text-amber-200">{translations.rebirth.title}</h2>
      {isSpinning ? (
        <>
          <div className="text-9xl animate-spin-wheel" aria-hidden>
            ☸️
          </div>
          <p className="text-stone-300">{translations.rebirth.spinning}</p>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 animate-fade-in-up">
          <p className="text-stone-300">{translations.rebirth.result}</p>
          <div className="text-9xl animate-float" aria-hidden>
            {rebirth.icon}
          </div>
          <p className="text-3xl font-bold text-amber-300">{rebirthText.name}</p>
          <p className="max-w-md text-center text-stone-300">{rebirthText.description}</p>
          <div className="flex gap-3">
            <button type="button" className="btn-ghost" onClick={copyResult}>
              {hasCopied ? translations.rebirth.copied : translations.rebirth.share}
            </button>
            <button type="button" className="btn-underworld" onClick={restart}>
              {translations.common.restart}
            </button>
          </div>
        </div>
      )}
    </Scene>
  );
}

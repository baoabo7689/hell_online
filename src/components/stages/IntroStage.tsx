'use client';

import { useState } from 'react';
import Scene from '@/components/Scene';
import { useLanguage } from '@/context/LanguageContext';
import { SoulTransferPayload } from '@/utilities/soulTransfer';

interface IntroStageProps {
  transfer: SoulTransferPayload | null;
  canResume: boolean;
  onStart: (soulName: string) => void;
  onResume: () => void;
}

export default function IntroStage({ transfer, canResume, onStart, onResume }: IntroStageProps) {
  const { translations } = useLanguage();
  const [soulName, setSoulName] = useState(transfer?.soulName ?? '');

  return (
    <Scene background="from-black via-red-950 to-black" particle="embers" seed={7}>
      <div className="animate-flicker text-8xl select-none" aria-hidden>
        ⛩️
      </div>
      <h2 className="text-4xl font-bold tracking-wide text-orange-300">{translations.intro.title}</h2>
      <p className="max-w-md text-center text-stone-300">{translations.intro.subtitle}</p>
      {transfer && (
        <p className="speech-bubble max-w-md text-center text-sm text-amber-200">
          {translations.intro.transferNotice}
        </p>
      )}
      <form
        className="flex w-full max-w-sm flex-col gap-3"
        onSubmit={event => {
          event.preventDefault();
          onStart(soulName);
        }}
      >
        <label className="text-sm text-stone-400" htmlFor="soul-name">
          {translations.intro.nameLabel}
        </label>
        <input
          id="soul-name"
          value={soulName}
          maxLength={40}
          onChange={event => setSoulName(event.target.value)}
          placeholder={translations.intro.namePlaceholder}
          className="rounded-md border border-red-900 bg-black/60 px-3 py-2 text-stone-100 outline-none focus:border-orange-500"
        />
        <button type="submit" className="btn-underworld">
          {translations.intro.enter}
        </button>
        {canResume && (
          <button type="button" className="btn-ghost" onClick={onResume}>
            {translations.intro.resume}
          </button>
        )}
      </form>
      <p className="max-w-md text-center text-xs text-stone-500">{translations.intro.disclaimer}</p>
    </Scene>
  );
}

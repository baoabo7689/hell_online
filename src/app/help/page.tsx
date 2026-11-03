'use client';

import { useLanguage } from '@/context/LanguageContext';
import { hellLevels } from '@/data/hellLevels';

export default function HelpPage() {
  const { translations } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-3xl font-bold text-orange-300">{translations.help.title}</h1>
      <p className="mb-8 text-stone-300">{translations.help.intro}</p>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-orange-200">{translations.help.flowTitle}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-stone-300">
          {translations.help.flow.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-orange-200">{translations.help.levelsTitle}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {hellLevels.map(level => {
            const levelText = translations.levels[level.id];
            return (
              <div key={level.id} className={`rounded-lg border border-red-900/60 bg-gradient-to-br p-3 ${level.background}`}>
                <div className="flex items-center gap-2">
                  <span className="text-3xl" aria-hidden>
                    {level.icon}
                  </span>
                  <div>
                    <div className="text-xs text-stone-400">
                      {translations.common.level} {level.order}
                    </div>
                    <div className="font-semibold text-orange-200">{levelText.name}</div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-stone-300">{levelText.description}</p>
                <ul className="mt-2 list-disc pl-5 text-xs text-stone-400">
                  {levelText.sins.map((sin: string) => (
                    <li key={sin}>{sin}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-orange-200">{translations.help.transferTitle}</h2>
        <p className="text-stone-300">{translations.help.transferText}</p>
      </section>
    </div>
  );
}

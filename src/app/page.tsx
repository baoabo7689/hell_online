'use client';

import { useCallback, useEffect, useState } from 'react';
import ArrestStage from '@/components/stages/ArrestStage';
import BridgeStage from '@/components/stages/BridgeStage';
import DescentStage from '@/components/stages/DescentStage';
import HeavenStage from '@/components/stages/HeavenStage';
import HeavenStairsStage from '@/components/stages/HeavenStairsStage';
import IntroStage from '@/components/stages/IntroStage';
import JudgmentStage from '@/components/stages/JudgmentStage';
import PunishmentStage from '@/components/stages/PunishmentStage';
import RebirthStage from '@/components/stages/RebirthStage';
import { StageProps } from '@/components/stages/StageProps';
import YamaStage from '@/components/stages/YamaStage';
import { initialJourney, Journey, JourneyStage } from '@/models/Journey';
import { clearJourney, loadJourney, saveJourney, startJourney } from '@/utilities/journeyUtilities';
import { readSoulTransferFromLocation, SoulTransferPayload } from '@/utilities/soulTransfer';

const stageComponents: Record<Exclude<JourneyStage, 'intro'>, React.ComponentType<StageProps>> = {
  arrest: ArrestStage,
  judgment: JudgmentStage,
  yama: YamaStage,
  descent: DescentStage,
  punishment: PunishmentStage,
  bridge: BridgeStage,
  rebirth: RebirthStage,
  heavenStairs: HeavenStairsStage,
  heaven: HeavenStage,
};

const resumableStages: JourneyStage[] = ['judgment', 'yama', 'descent', 'punishment', 'bridge'];

export default function HomePage() {
  const [journey, setJourney] = useState<Journey>(initialJourney);
  const [savedJourney, setSavedJourney] = useState<Journey | null>(null);
  const [transfer, setTransfer] = useState<SoulTransferPayload | null>(null);

  useEffect(() => {
    const incomingTransfer = readSoulTransferFromLocation();
    setTransfer(incomingTransfer);
    const stored = loadJourney();
    if (!incomingTransfer && stored && resumableStages.includes(stored.stage)) setSavedJourney(stored);
  }, []);

  const updateJourney = useCallback((nextJourney: Journey) => {
    setJourney(nextJourney);
    saveJourney(nextJourney);
    window.scrollTo({ top: 0 });
  }, []);

  const restart = useCallback(() => {
    clearJourney();
    setSavedJourney(null);
    setTransfer(null);
    setJourney(initialJourney);
    if (window.location.search) window.history.replaceState(null, '', window.location.pathname);
  }, []);

  if (journey.stage === 'intro') {
    return (
      <main className="flex flex-1 flex-col">
        <IntroStage
          key={transfer?.soulName ?? ''}
          transfer={transfer}
          canResume={savedJourney !== null}
          onStart={soulName => updateJourney(startJourney(soulName, transfer))}
          onResume={() => savedJourney && setJourney(savedJourney)}
        />
      </main>
    );
  }

  const ActiveStage = stageComponents[journey.stage];
  return (
    <main className="flex flex-1 flex-col">
      <ActiveStage key={journey.stage} journey={journey} updateJourney={updateJourney} restart={restart} />
    </main>
  );
}

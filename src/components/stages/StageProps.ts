import { Journey } from '@/models/Journey';

export interface StageProps {
  journey: Journey;
  updateJourney: (journey: Journey) => void;
  restart: () => void;
}

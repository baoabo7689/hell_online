'use client';

import { useEffect, useRef, useState } from 'react';

interface HoldButtonProps {
  durationMs: number;
  idleLabel: string;
  holdingLabel: string;
  releasedLabel: string;
  resetKey: string | number;
  onComplete: () => void;
  onHoldingChange?: (isHolding: boolean) => void;
}

const TICK_MS = 50;

export default function HoldButton({
  durationMs,
  idleLabel,
  holdingLabel,
  releasedLabel,
  resetKey,
  onComplete,
  onHoldingChange,
}: HoldButtonProps) {
  const [progressState, setProgressState] = useState({ key: resetKey, value: 0 });
  const [isHolding, setIsHolding] = useState(false);
  const [wasReleasedEarly, setWasReleasedEarly] = useState(false);
  const completedKeyRef = useRef<string | number | null>(null);
  const progress = progressState.key === resetKey ? progressState.value : 0;

  useEffect(() => {
    setIsHolding(false);
    setWasReleasedEarly(false);
  }, [resetKey]);

  useEffect(() => {
    onHoldingChange?.(isHolding);
  }, [isHolding, onHoldingChange]);

  useEffect(() => () => onHoldingChange?.(false), [onHoldingChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressState(current => {
        const currentValue = current.key === resetKey ? current.value : 0;
        const nextValue = isHolding
          ? Math.min(1, currentValue + TICK_MS / durationMs)
          : Math.max(0, currentValue - (TICK_MS / durationMs) * 2);
        return { key: resetKey, value: nextValue };
      });
    }, TICK_MS);
    return () => clearInterval(interval);
  }, [isHolding, durationMs, resetKey]);

  useEffect(() => {
    const isCurrentKey = progressState.key === resetKey;
    if (isCurrentKey && progressState.value >= 1 && completedKeyRef.current !== resetKey) {
      completedKeyRef.current = resetKey;
      setIsHolding(false);
      onComplete();
    }
  }, [progressState, resetKey, onComplete]);

  const startHolding = () => {
    setWasReleasedEarly(false);
    setIsHolding(true);
  };

  const stopHolding = () => {
    if (isHolding && progress < 1) setWasReleasedEarly(true);
    setIsHolding(false);
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-2">
      <button
        type="button"
        className="btn-underworld relative w-full select-none overflow-hidden"
        onPointerDown={startHolding}
        onPointerUp={stopHolding}
        onPointerLeave={stopHolding}
        onKeyDown={event => (event.key === ' ' || event.key === 'Enter') && !event.repeat && startHolding()}
        onKeyUp={event => (event.key === ' ' || event.key === 'Enter') && stopHolding()}
        onContextMenu={event => event.preventDefault()}
      >
        <span
          className="absolute inset-y-0 left-0 bg-orange-500/50 transition-[width] duration-75"
          style={{ width: `${progress * 100}%` }}
          aria-hidden
        />
        <span className="relative">{isHolding ? holdingLabel : idleLabel}</span>
      </button>
      <div className="h-5 text-xs text-red-300">{wasReleasedEarly && !isHolding ? releasedLabel : ''}</div>
    </div>
  );
}

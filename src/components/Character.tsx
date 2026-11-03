'use client';

interface CharacterProps {
  icon: string;
  name: string;
  line?: string;
  sizeClass?: string;
  animationClass?: string;
  lightBubble?: boolean;
}

export default function Character({
  icon,
  name,
  line,
  sizeClass = 'text-7xl',
  animationClass = 'animate-float',
  lightBubble = false,
}: CharacterProps) {
  return (
    <div className="flex max-w-xs flex-col items-center gap-2 text-center">
      <div className={`${sizeClass} ${animationClass} select-none`} aria-hidden>
        {icon}
      </div>
      <div className="text-sm font-semibold uppercase tracking-widest text-amber-300">{name}</div>
      {line && (
        <p className={`speech-bubble animate-fade-in-up text-sm ${lightBubble ? 'speech-bubble-light' : ''}`}>
          {line}
        </p>
      )}
    </div>
  );
}

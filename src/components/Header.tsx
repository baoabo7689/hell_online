'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

import ContactButton from './ContactButton';
import LanguageButton from './LanguageButton';
import HelpIcon from './HelpButton';

export default function Header() {
  const { translations } = useLanguage();

  return (
    <header className="flex items-center justify-between border-b border-red-900/60 bg-black px-6 py-2">
      <div className="flex-1">
        <Link href="/">
          <h1 className="cursor-pointer text-2xl font-bold text-orange-400 transition-colors duration-200 hover:text-red-400">
            🔥 {translations.header.title}
          </h1>
        </Link>
      </div>

      <nav className="flex items-center gap-6">
        <LanguageButton />
        <HelpIcon />
        <ContactButton />
      </nav>
    </header>
  );
}

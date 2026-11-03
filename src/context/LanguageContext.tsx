"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultLocale, getTranslations, getLanguageFromStorage, setLanguageToLocalStorage } from '@/i18n';

interface LanguageContextProps {
  language: string;
  translations: any;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState(defaultLocale);

  useEffect(() => {
    setLanguageState(getLanguageFromStorage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    setLanguageToLocalStorage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, translations: getTranslations(language), setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

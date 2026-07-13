'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getMessages } from './messages';
import { LOCALE_COOKIE_KEY, LOCALE_QUERY_KEY, isLocale } from './locale';
import { DEFAULT_LOCALE, Locale } from './types';

const DAY_IN_SECONDS = 24 * 60 * 60;
const LOCALE_COOKIE_MAX_AGE = 365 * DAY_IN_SECONDS;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const resolveMessage = (locale: Locale, key: string): string => {
  const dictionary = getMessages(locale) as Record<string, unknown>;
  const value = key
    .split('.')
    .reduce<unknown>(
      (acc, part) => (acc as Record<string, unknown>)?.[part],
      dictionary,
    );

  return typeof value === 'string' ? value : key;
};

const persistLocale = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}`;
};

export const I18nProvider = ({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = (value: Locale) => {
    setLocaleState(value);
    persistLocale(value);
    document.documentElement.lang = value;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const localeFromQuery = params.get(LOCALE_QUERY_KEY);

    if (isLocale(localeFromQuery) && localeFromQuery !== locale) {
      setLocale(localeFromQuery);
      return;
    }

    const cookieLocale = document.cookie
      .split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${LOCALE_COOKIE_KEY}=`))
      ?.split('=')[1];

    if (isLocale(cookieLocale) && cookieLocale !== locale) {
      setLocale(cookieLocale);
      return;
    }

    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    return {
      locale,
      setLocale,
      t: (key: string) => resolveMessage(locale, key),
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
};

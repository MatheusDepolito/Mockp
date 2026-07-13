import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from './types';

export const LOCALE_COOKIE_KEY = 'locale';
export const LOCALE_QUERY_KEY = 'lang';

export const isLocale = (value?: string | null): value is Locale => {
  if (!value) {
    return false;
  }

  return SUPPORTED_LOCALES.includes(value as Locale);
};

export const resolveLocale = (value?: string | null): Locale => {
  return isLocale(value) ? value : DEFAULT_LOCALE;
};

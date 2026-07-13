export const SUPPORTED_LOCALES = ['pt-BR', 'en-US'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'pt-BR';

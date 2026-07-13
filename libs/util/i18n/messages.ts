import { Locale } from './types';
import ptBr from './locales/pt-BR.json';
import enUs from './locales/en-US.json';

export const messages = {
  'pt-BR': ptBr,
  'en-US': enUs,
} as const satisfies Record<Locale, typeof ptBr>;

export type MessageCatalog = typeof ptBr;
export type MessageKey = string;

export const getMessages = (locale: Locale): MessageCatalog => {
  return messages[locale];
};

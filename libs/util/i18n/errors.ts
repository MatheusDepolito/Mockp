import { ApolloError } from '@apollo/client';
import { ErrorCode, ErrorCodes } from './errorCodes';
import { Locale } from './types';
import { getMessages } from './messages';

type GraphQlErrorLike = {
  message?: string;
  extensions?: {
    appCode?: string;
    fallbackMessage?: string;
  };
};

const isKnownErrorCode = (value?: string): value is ErrorCode => {
  return !!value && Object.values(ErrorCodes).includes(value as ErrorCode);
};

export const translateApiErrorByCode = (code: ErrorCode, locale: Locale) => {
  const labels = getMessages(locale).apiErrors as Record<string, string>;
  return labels[code] ?? labels.UNKNOWN;
};

export const getApiErrorMessage = ({
  error,
  locale,
  fallbackMessage,
}: {
  error: unknown;
  locale: Locale;
  fallbackMessage?: string;
}) => {
  if (error instanceof ApolloError) {
    const gqlError = error.graphQLErrors?.[0] as GraphQlErrorLike | undefined;
    const extensionCode = gqlError?.extensions?.appCode;
    if (isKnownErrorCode(extensionCode)) {
      return translateApiErrorByCode(extensionCode, locale);
    }

    return (
      gqlError?.extensions?.fallbackMessage ??
      gqlError?.message ??
      error.message ??
      fallbackMessage ??
      translateApiErrorByCode(ErrorCodes.Unknown, locale)
    );
  }

  if (error instanceof Error) {
    return error.message || fallbackMessage || '';
  }

  return fallbackMessage ?? '';
};

import { ApolloError } from '@apollo/client';

export type NormalizedApiError = {
  code?: string;
  fallbackMessage: string;
};

type GraphQlErrorLike = {
  message?: string;
  extensions?: {
    appCode?: string;
    fallbackMessage?: string;
  };
};

export const normalizeApiError = (error: ApolloError): NormalizedApiError => {
  const gqlError = error.graphQLErrors?.[0] as GraphQlErrorLike | undefined;
  return {
    code: gqlError?.extensions?.appCode,
    fallbackMessage:
      gqlError?.extensions?.fallbackMessage ??
      gqlError?.message ??
      error.message,
  };
};

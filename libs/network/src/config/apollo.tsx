'use client';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client';
import { ReactNode } from 'react';
import { setContext } from '@apollo/client/link/context';

const LOCALE_COOKIE_KEY = 'locale';

export interface IApolloProviderProps {
  children: ReactNode;
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await fetch('/api/auth/token').then((res) => res.json());
    const localeCookie = document.cookie
      .split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${LOCALE_COOKIE_KEY}=`))
      ?.split('=')[1];

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'accept-language': localeCookie || 'pt-BR',
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <Provider client={apolloClient}>{children}</Provider>;
};

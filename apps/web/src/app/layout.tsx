import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@mockp/ui/src/app/globals.css';
import { ApolloProvider } from '@mockp/network/src/config/apollo';
import { SessionProvider } from '@mockp/ui/src/components/molecules/SessionProvider';
import { Header } from '@mockp/ui/src/components/organisms/Header';
import { ToastContainer } from '@mockp/ui/src/components/molecules/Toast';
import { MenuItem } from '@mockp/util/types';
import { Container } from '@mockp/ui/src/components/atoms/Container';
import {
  getMessages,
  I18nProvider,
  LOCALE_COOKIE_KEY,
  resolveLocale,
} from '@mockp/util/i18n';
import { cookies } from 'next/headers';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mockp — Imóveis',
  description:
    'Busque imóveis ou acesse ferramentas para corretores e imobiliárias.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = resolveLocale(cookies().get(LOCALE_COOKIE_KEY)?.value);
  const menuMessages = getMessages(locale).menu;
  const menuItems: MenuItem[] = [
    { label: menuMessages.search, href: '/search' },
    { label: menuMessages.inquiries, href: '/inquiries' },
  ];

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-gray-25`}>
        <SessionProvider>
          <ApolloProvider>
            <I18nProvider initialLocale={locale}>
              <Header menuItems={menuItems} />
              <Container>{children}</Container>
              <ToastContainer />
            </I18nProvider>
          </ApolloProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

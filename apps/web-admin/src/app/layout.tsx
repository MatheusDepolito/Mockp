import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@mockp/ui/src/app/globals.css';
import { MenuItem } from '@mockp/util/types';
import { ApolloProvider } from '@mockp/network/src/config/apollo';
import { SessionProvider } from '@mockp/ui/src/components/molecules/SessionProvider';
import { ToastContainer } from '@mockp/ui/src/components/molecules/Toast';
import { Container } from '@mockp/ui/src/components/atoms/Container';
import { Header } from '@mockp/ui/src/components/organisms/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Autospace | Admin',
  description: 'Generated by create next app',
};

const MENUITEMS: MenuItem[] = [
  { label: 'Garages', href: '/' },
  { label: 'Admins', href: '/manageAdmins' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-25`}>
        <SessionProvider>
          <ApolloProvider>
            <Header type="admin" menuItems={MENUITEMS} />
            <Container>{children}</Container>
          </ApolloProvider>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

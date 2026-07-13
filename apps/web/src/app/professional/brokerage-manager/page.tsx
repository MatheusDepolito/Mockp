import Link from 'next/link';
import { managerAppUrl } from '@mockp/util/appUrls';
import {
  getMessages,
  LOCALE_COOKIE_KEY,
  resolveLocale,
} from '@mockp/util/i18n';
import { cookies } from 'next/headers';

export default function BrokerageManagerLandingPage() {
  const locale = resolveLocale(cookies().get(LOCALE_COOKIE_KEY)?.value);
  const messages = getMessages(locale).professionalBrokerageManagerPage;

  return (
    <main className="min-h-[calc(100vh-4rem)] py-10">
      <div className="max-w-lg mx-auto space-y-6 text-center">
        <div className="space-y-2">
          <Link
            href="/professional"
            className="text-sm text-gray-500 hover:text-primary hover:underline"
          >
            ← {messages.back}
          </Link>
          <h1 className="text-2xl font-black">{messages.title}</h1>
          <p className="text-sm text-gray-600">{messages.description}</p>
        </div>
        <Link
          href={`${managerAppUrl}/register`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          {messages.cta} →
        </Link>
      </div>
    </main>
  );
}

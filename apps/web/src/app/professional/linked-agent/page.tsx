import Link from 'next/link';
import { agentAppUrl } from '@mockp/util/appUrls';
import {
  getMessages,
  LOCALE_COOKIE_KEY,
  resolveLocale,
} from '@mockp/util/i18n';
import { cookies } from 'next/headers';

export default function LinkedAgentLandingPage() {
  const locale = resolveLocale(cookies().get(LOCALE_COOKIE_KEY)?.value);
  const messages = getMessages(locale).professionalLinkedAgentPage;

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
          <p className="text-xs text-amber-700 bg-amber-50 rounded px-3 py-2">
            {messages.instruction}
          </p>
        </div>
        <Link
          href={`${agentAppUrl}/login`}
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

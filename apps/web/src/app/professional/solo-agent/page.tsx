import Link from 'next/link';
import { RegisterSoloAgentForm } from '@mockp/ui/src/components/templates/RegisterSoloAgentForm';
import {
  getMessages,
  LOCALE_COOKIE_KEY,
  resolveLocale,
} from '@mockp/util/i18n';
import { cookies } from 'next/headers';

export default function SoloAgentRegisterPage() {
  const locale = resolveLocale(cookies().get(LOCALE_COOKIE_KEY)?.value);
  const messages = getMessages(locale).professionalAgentPage;

  return (
    <main className="min-h-[calc(100vh-4rem)] py-10">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="space-y-2 text-center">
          <Link
            href="/professional"
            className="text-sm text-gray-500 hover:text-primary hover:underline"
          >
            ← {messages.back}
          </Link>
          <h1 className="text-2xl font-black">{messages.title}</h1>
          <p className="text-sm text-gray-600">{messages.subtitle}</p>
        </div>
        <RegisterSoloAgentForm />
      </div>
    </main>
  );
}

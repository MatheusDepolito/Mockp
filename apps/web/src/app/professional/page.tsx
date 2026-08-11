import {
  IconBuildingStore,
  IconLogin,
  IconUserPlus,
} from '@tabler/icons-react';
import Link from 'next/link';
import {
  getMessages,
  LOCALE_COOKIE_KEY,
  resolveLocale,
} from '@mockp/util/i18n';
import { cookies } from 'next/headers';

export default function ProfessionalHubPage() {
  const locale = resolveLocale(cookies().get(LOCALE_COOKIE_KEY)?.value);
  const messages = getMessages(locale).professionalHubPage;

  const options = [
    {
      title: messages.brokerageManager.title,
      description: messages.brokerageManager.description,
      href: '/professional/brokerage-manager',
      cta: messages.brokerageManager.cta,
      icon: IconBuildingStore,
    },
    {
      title: messages.soloAgent.title,
      description: messages.soloAgent.description,
      href: '/professional/solo-agent',
      cta: messages.soloAgent.cta,
      icon: IconUserPlus,
    },
    {
      title: messages.linkedAgent.title,
      description: messages.linkedAgent.description,
      href: '/professional/linked-agent',
      cta: messages.linkedAgent.cta,
      icon: IconLogin,
      note: messages.linkedAgent.note,
    },
  ];

  return (
    <main className="min-h-[calc(100vh-4rem)] py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-primary hover:underline"
          >
            ← {messages.back}
          </Link>
          <h1 className="text-3xl font-black">{messages.title}</h1>
          <p className="text-gray-600">{messages.subtitle}</p>
        </div>

        <div className="space-y-4">
          {options.map(
            ({ title, description, href, cta, icon: Icon, note }) => (
              <div
                key={href}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                    <Icon size={22} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <p className="text-sm text-gray-600">{description}</p>
                    {note ? (
                      <p className="text-xs text-amber-700 bg-amber-50 rounded px-2 py-1.5">
                        {note}
                      </p>
                    ) : null}
                    <Link
                      href={href}
                      className="inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      {cta} →
                    </Link>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </main>
  );
}

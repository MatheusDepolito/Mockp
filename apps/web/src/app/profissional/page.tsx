'use client';
import {
  IconBuildingStore,
  IconLogin,
  IconUserPlus,
} from '@tabler/icons-react';
import Link from 'next/link';
import { agentAppUrl, managerAppUrl } from '@mockp/util/appUrls';

const options = [
  {
    title: 'Gestor de imobiliária',
    description:
      'Crie sua corretora, cadastre corretores e gerencie imóveis no painel do gestor.',
    href: `${managerAppUrl}/register`,
    cta: 'Cadastrar imobiliária',
    icon: IconBuildingStore,
    external: true,
  },
  {
    title: 'Corretor autônomo',
    description:
      'Cadastre-se, informe seu CRECI e publique imóveis no seu nome — sem vínculo com imobiliária.',
    href: '/profissional/corretor',
    cta: 'Criar conta de corretor',
    icon: IconUserPlus,
    external: false,
  },
  {
    title: 'Corretor de imobiliária',
    description:
      'Seu gestor precisa cadastrá-lo por e-mail. Depois, acesse o painel do corretor.',
    href: `${agentAppUrl}/login`,
    cta: 'Já tenho conta — entrar',
    icon: IconLogin,
    external: true,
    note: 'Não há auto-cadastro para corretores vinculados — peça ao gestor da sua imobiliária.',
  },
];

export default function ProfissionalPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-primary hover:underline"
          >
            ← Voltar ao portal
          </Link>
          <h1 className="text-3xl font-black">Área profissional</h1>
          <p className="text-gray-600">
            Escolha como você atua no mercado imobiliário.
          </p>
        </div>

        <div className="space-y-4">
          {options.map(
            ({ title, description, href, cta, icon: Icon, external, note }) => (
              <div
                key={title}
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
                      {...(external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
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

'use client';
import { IconBuilding, IconSearch, IconUser } from '@tabler/icons-react';
import Link from 'next/link';

const cards = [
  {
    title: 'Buscar imóveis',
    description:
      'Explore o mapa sem cadastro. Crie conta só quando quiser agendar uma visita.',
    href: '/search',
    icon: IconSearch,
    primary: true,
  },
  {
    title: 'Sou corretor ou imobiliária',
    description:
      'Gestores, corretores autônomos e corretores vinculados — escolha seu perfil.',
    href: '/professional',
    icon: IconBuilding,
    primary: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Encontre o imóvel certo
          </h1>
          <p className="text-lg text-gray-600">
            Portal Mockp — busca para quem procura casa, ferramentas para quem
            anuncia.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map(({ title, description, href, icon: Icon, primary }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-4 rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-md"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                  primary
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <Icon size={28} stroke={1.5} />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
              <span className="mt-auto text-sm font-semibold text-primary group-hover:underline">
                Continuar →
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <IconUser size={18} />
          <span>
            Já é profissional?{' '}
            <Link
              href="/professional"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Acesse as opções de login
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}

'use client';
import { AgentMeDocument } from '@mockp/network/src/gql/generated';
import { useQuery } from '@apollo/client';
import { LoaderPanel } from '../molecules/Loader';
import { AlertSection } from '../molecules/AlertSection';
import { UnverifiedProfileBanner } from '../molecules/VerificationBadge';
import { webAppUrl } from '@mockp/util/appUrls';
import Link from 'next/link';
import { ReactNode } from 'react';

type RenderPropChild = (agent: {
  uid: string;
  brokerageId?: number | null;
}) => ReactNode;

export const IsAgent = ({
  children,
  uid,
}: {
  children: RenderPropChild | ReactNode;
  uid: string;
}) => {
  const { data, loading } = useQuery(AgentMeDocument);

  if (loading) {
    return <LoaderPanel text="Carregando perfil..." />;
  }

  if (!data?.agentMe) {
    return (
      <AlertSection>
        <div>Você não está cadastrado como corretor.</div>
        <div>
          Corretor de imobiliária: peça ao gestor para cadastrá-lo por e-mail.
        </div>
        <div>
          Corretor autônomo:{' '}
          <Link
            href={`${webAppUrl}/professional/solo-agent`}
            className="underline underline-offset-4"
          >
            cadastre-se aqui
          </Link>
          .
        </div>
        <div className="text-xs text-gray-500 mt-2">Seu ID: {uid}</div>
      </AlertSection>
    );
  }

  const agent = data.agentMe;

  return (
    <>
      {!agent.verified ? <UnverifiedProfileBanner /> : null}
      {typeof children === 'function'
        ? (children as RenderPropChild)(agent)
        : children}
    </>
  );
};

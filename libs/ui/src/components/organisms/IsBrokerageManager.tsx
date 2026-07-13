'use client';
import { MyBrokerageDocument } from '@mockp/network/src/gql/generated';
import { useQuery } from '@apollo/client';
import { LoaderPanel } from '../molecules/Loader';
import { AlertSection } from '../molecules/AlertSection';
import { UnverifiedProfileBanner } from '../molecules/VerificationBadge';
import { ReactNode } from 'react';
import { CreateBrokerage } from './CreateBrokerage';

type RenderPropChild = (id: number) => ReactNode;

export const IsBrokerageManager = ({
  children,
}: {
  children: RenderPropChild | ReactNode;
}) => {
  const { data, loading } = useQuery(MyBrokerageDocument);

  if (loading) {
    return <LoaderPanel text="Loading company..." />;
  }

  if (!data?.myBrokerage) {
    return (
      <AlertSection>
        <div>You don&apos;t have a company yet.</div>
        <CreateBrokerage />
      </AlertSection>
    );
  }
  return (
    <div>
      {!data.myBrokerage.verified ? (
        <UnverifiedProfileBanner>
          Sua imobiliária está em análise. Imóveis e corretores só aparecem como
          verificados após aprovação.
        </UnverifiedProfileBanner>
      ) : null}
      {typeof children === 'function'
        ? (children as RenderPropChild)(data.myBrokerage.id)
        : children}
    </div>
  );
};

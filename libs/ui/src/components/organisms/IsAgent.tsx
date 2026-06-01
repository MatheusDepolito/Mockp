'use client';
import { AgentMeDocument } from '@mockp/network/src/gql/generated';
import { useQuery } from '@apollo/client';
import { LoaderPanel } from '../molecules/Loader';
import { AlertSection } from '../molecules/AlertSection';
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
type RenderPropChild = (id: number) => ReactNode;

export const IsAgent = ({
  children,
  uid,
}: {
  children: RenderPropChild | ReactNode;
  uid: string;
}) => {
  const { data, loading } = useQuery(AgentMeDocument);

  if (loading) {
    return <LoaderPanel text="Loading company..." />;
  }

  if (!data?.valetMe?.brokerageId)
    return (
      <AlertSection>
        <div>You are not a valet.</div>
        <div>Please contact the company&apos;s managers with your ID. </div>
        <div>{uid}</div>
      </AlertSection>
    );

  return (
    <>
      {typeof children === 'function'
        ? (children as RenderPropChild)(data.valetMe.brokerageId)
        : children}
    </>
  );
};

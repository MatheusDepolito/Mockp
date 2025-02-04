'use client';

import { Button } from '@mockp/ui/src/components/atoms/Button';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Sidebar } from '@mockp/ui/src/components/organisms/Sidebar';
import { useQuery } from '@apollo/client';
import { SearchGaragesDocument } from '@mockp/network/src/gql/generated';

export default function Home() {
  const { data: sessionData, status, update } = useSession();

  const { data: garages } = useQuery(SearchGaragesDocument, {
    variables: {
      dateFilter: { end: '2024-12-14', start: '2024-12-04' },
      locationFilter: {
        ne_lat: 1,
        ne_lng: 1,
        sw_lat: -1,
        sw_lng: -1,
      },
    },
  });

  return (
    <main className="p-8">
      test
      <div>
        {garages?.searchGarages.map((garage) => (
          <div key={garage.id} className="p-4 rounded">
            <pre key={garage.id}>{JSON.stringify(garage, null, 2)}</pre>
          </div>
        ))}
      </div>
    </main>
  );
}

'use client';

import { Button } from '@mockp/ui/src/components/atoms/Button';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: sessionData, status, update } = useSession();

  return (
    <main className="p-8">
      {sessionData?.user?.name ? (
        <Button onClick={() => signOut()}>Signout</Button>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </main>
  );
}

'use client';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';
import { IsAgent } from '@mockp/ui/src/components/organisms/IsAgent';
import { AgentHome } from '@mockp/ui/src/components/templates/AgentHome';

export default function Home() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsAgent uid={uid}>
            <AgentHome />
          </IsAgent>
        )}
      </IsLoggedIn>
    </main>
  );
}

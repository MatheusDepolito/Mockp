'use client';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';
import { IsAgent } from '@mockp/ui/src/components/organisms/IsAgent';
import { AgentTrips } from '@mockp/ui/src/components/templates/AgentTrips';

export default function Page() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsAgent uid={uid}>
            <AgentTrips uid={uid} />
          </IsAgent>
        )}
      </IsLoggedIn>
    </main>
  );
}

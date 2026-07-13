'use client';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';
import { IsAgent } from '@mockp/ui/src/components/organisms/IsAgent';
import { AgentProperties } from '@mockp/ui/src/components/templates/AgentProperties';

export default function Page() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsAgent uid={uid}>
            <AgentProperties />
          </IsAgent>
        )}
      </IsLoggedIn>
    </main>
  );
}

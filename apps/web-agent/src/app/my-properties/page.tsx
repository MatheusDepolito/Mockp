'use client';
import { IsAgent } from '@mockp/ui/src/components/organisms/IsAgent';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';
import { AgentProperties } from '@mockp/ui/src/components/templates/AgentProperties';

export default function Page() {
  return (
    <IsLoggedIn>
      {(uid) => (
        <IsAgent uid={uid}>
          <AgentProperties />
        </IsAgent>
      )}
    </IsLoggedIn>
  );
}

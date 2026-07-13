'use client';
import { CreateProperty } from '@mockp/ui/src/components/templates/CreateProperty';
import { IsAgent } from '@mockp/ui/src/components/organisms/IsAgent';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';

export default function Page() {
  return (
    <IsLoggedIn>
      {(uid) => (
        <IsAgent uid={uid}>
          <CreateProperty mode="solo" />
        </IsAgent>
      )}
    </IsLoggedIn>
  );
}

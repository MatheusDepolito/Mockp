'use client';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';
import { IsValet } from '@mockp/ui/src/components/organisms/IsValet';
import { ValetTrips } from '@mockp/ui/src/components/templates/ValetTrips';

export default function Page() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsValet uid={uid}>
            <ValetTrips uid={uid} />
          </IsValet>
        )}
      </IsLoggedIn>
    </main>
  );
}

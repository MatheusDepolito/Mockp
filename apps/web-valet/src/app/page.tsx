'use client';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';
import { IsValet } from '@mockp/ui/src/components/organisms/IsValet';
import { ValetHome } from '@mockp/ui/src/components/templates/ValetHome';

export default function Home() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsValet uid={uid}>
            <ValetHome />
          </IsValet>
        )}
      </IsLoggedIn>
    </main>
  );
}

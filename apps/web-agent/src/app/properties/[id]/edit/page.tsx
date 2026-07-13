'use client';
import { EditProperty } from '@mockp/ui/src/components/templates/EditProperty';
import { IsAgent } from '@mockp/ui/src/components/organisms/IsAgent';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <IsLoggedIn>
      {(uid) => (
        <IsAgent uid={uid}>
          <EditProperty id={Number(params.id)} />
        </IsAgent>
      )}
    </IsLoggedIn>
  );
}

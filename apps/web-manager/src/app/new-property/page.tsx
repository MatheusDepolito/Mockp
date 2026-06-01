'use client';
import { CreateProperty } from '@mockp/ui/src/components/templates/CreateProperty';
import { IsBrokerageManager } from '@mockp/ui/src/components/organisms/IsBrokerageManager';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';

export default function Page() {
  return (
    <IsLoggedIn>
      <IsBrokerageManager>
        {(brokerageId) => <CreateProperty brokerageId={brokerageId} />}
      </IsBrokerageManager>
    </IsLoggedIn>
  );
}

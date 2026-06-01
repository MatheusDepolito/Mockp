'use client';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';
import { IsBrokerageManager } from '@mockp/ui/src/components/organisms/IsBrokerageManager';
import { ListProperties } from '@mockp/ui/src/components/organisms/ListProperties';

export default function Home() {
  return (
    <IsLoggedIn>
      <IsBrokerageManager>
        {(brokerageId) => <ListProperties brokerageId={brokerageId} />}
      </IsBrokerageManager>
    </IsLoggedIn>
  );
}

import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';
import { IsBrokerageManager } from '@mockp/ui/src/components/organisms/IsBrokerageManager';
import { ListPropertyInquiries } from '@mockp/ui/src/components/templates/ListPropertyInquiries';
export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const propertyId = Number(searchParams['propertyId']);

  return (
    <main>
      <IsLoggedIn>
        <IsBrokerageManager>
          <ListPropertyInquiries propertyId={propertyId} />
        </IsBrokerageManager>
      </IsLoggedIn>
    </main>
  );
}

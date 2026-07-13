import { IsAgent } from '@mockp/ui/src/components/organisms/IsAgent';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';
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
        {(uid) => (
          <IsAgent uid={uid}>
            <ListPropertyInquiries propertyId={propertyId} />
          </IsAgent>
        )}
      </IsLoggedIn>
    </main>
  );
}

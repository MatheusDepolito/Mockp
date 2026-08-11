import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';
import { ListCustomerInquiries } from '@mockp/ui/src/components/templates/ListCustomerInquiries';

export default function Page() {
  return (
    <main>
      <IsLoggedIn>
        <ListCustomerInquiries />
      </IsLoggedIn>
    </main>
  );
}

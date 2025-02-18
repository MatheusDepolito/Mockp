import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';
import { ListCustomerBookings } from '@mockp/ui/src/components/templates/ListCustomerBookings';

export default function Page() {
  return (
    <main>
      <IsLoggedIn>
        <ListCustomerBookings />
      </IsLoggedIn>
    </main>
  );
}

import { ManageValets } from '@mockp/ui/src/components/templates/ManageValets';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';

export default function Page() {
  return (
    <IsLoggedIn>
      <ManageValets />
    </IsLoggedIn>
  );
}

import { ManageAgents } from '@mockp/ui/src/components/templates/ManageAgents';
import { IsLoggedIn } from '@mockp/ui/src/components/organisms/IsLoggedIn';

export default function Page() {
  return (
    <IsLoggedIn>
      <ManageAgents />
    </IsLoggedIn>
  );
}

import { IsAdmin } from '@mockp/ui/src/components/organisms/IsAdmin';
import { AdminVerifications } from '@mockp/ui/src/components/templates/AdminVerifications';

export default function VerificationsPage() {
  return (
    <main>
      <IsAdmin>
        <AdminVerifications />
      </IsAdmin>
    </main>
  );
}

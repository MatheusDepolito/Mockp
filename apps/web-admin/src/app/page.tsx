import { IsAdmin } from '@mockp/ui/src/components/organisms/IsAdmin';
import { AdminHome } from '@mockp/ui/src/components/templates/AdminHome';

export default function Home() {
  return (
    <main>
      <IsAdmin>
        <AdminHome />
      </IsAdmin>
    </main>
  );
}

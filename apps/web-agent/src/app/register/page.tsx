import { RegisterSoloAgentForm } from '@mockp/ui/src/components/templates/RegisterSoloAgentForm';
import { AuthLayout } from '@mockp/ui/src/components/molecules/AuthLayout';

export default function Page() {
  return (
    <AuthLayout title="Register">
      <RegisterSoloAgentForm />
    </AuthLayout>
  );
}
